# 답변: 왜 query data가 달라졌는데 업데이트가 안 될까?

## 핵심 원인

`[...previous]`는 새 배열을 만들지만, **배열 안의 객체들은 여전히 같은 참조**를 가리킨다.

```ts
const newData = [...previous]
console.log(Object.is(newData, previous)) // false ✓ 배열 자체는 다름
console.log(Object.is(newData[0], previous[0])) // true ✗ 내부 객체는 같음!
```

## React Query의 동작 방식: Structural Sharing

React Query는 `setQueryData`가 호출되면 **structural sharing**을 수행한다.
새 데이터와 기존 데이터를 **깊은 비교(deep comparison)**해서 변경되지 않은 부분은 기존 참조를 재사용한다.

```ts
// React Query 내부 동작 (replaceEqualDeep)
const newData = [...previous] // 새 배열
const oldData = queryCache.getQueryData(key) // 기존 캐시

// structural sharing: 각 요소를 비교
// newData[0] === oldData[0] ? → 같은 객체! → 기존 참조 재사용
// newData[1] === oldData[1] ? → 같은 객체! → 기존 참조 재사용
```

**문제**: `[...previous]`로 새 배열을 만들어도, 내부 객체들이 같은 참조이므로
React Query는 "아무것도 안 바뀌었네"라고 판단하고 **기존 캐시 데이터를 그대로 사용**한다.

## 왜 ProgressSession만 리렌더링 됐나?

```tsx
// 낙관적 업데이트 코드
const newData = [...previous] // newData[0] === previous[0] (같은 참조)
session.completed_at = completed_at // 객체 직접 변경 (mutation)

// React Query의 structural sharing 후
// → newData[0]이 previous[0]과 같으므로 기존 참조 유지
// → useQuery의 data 참조가 바뀌지 않음!
```

```tsx
// ProgressColumnSection.tsx
const { data } = useQuery(...)           // data 참조가 안 바뀜 → 리렌더 안됨!

// ProgressSession.tsx (직접 mutation된 객체를 렌더링)
const { session } = props
return <div>{session.completed_at}</div> // 같은 객체의 값이 바뀜 → React가 감지 → 리렌더
```

- `ProgressColumnSection`: structural sharing으로 인해 `data` 참조 안 바뀜 → **리렌더 안됨**
- `ProgressSession`: 직접 변경된 객체를 읽음 → 값이 바뀌어 있음 → 리렌더 됨

**핵심**: React Query의 structural sharing이 `[...previous]`의 새 배열을 무시하고
내부 객체가 같으면 기존 캐시를 유지한다. 그래서 `useQuery`를 사용하는 부모 컴포넌트는 리렌더되지 않는다.

## Structural Sharing 개념

### 어디서 온 개념인가?

Structural Sharing은 **React가 만든 개념이 아니다**. 함수형 프로그래밍과 불변 자료구조에서 온 개념이다.

- **기원**: Clojure, Haskell 등 함수형 언어의 Persistent Data Structure
- **JavaScript 생태계**: Immutable.js, Immer 등 라이브러리가 구현
- **TanStack Query**: `replaceEqualDeep` 함수로 구현. 새 데이터와 기존 캐시를 비교해서 변경된 부분만 새 참조로 교체
- **React**: 직접 구현하진 않지만, 참조 비교(`Object.is`)를 통해 이 패턴의 이점을 활용

### React Query에서 어떻게 동작하나?

`setQueryData` 호출 시 React Query는 새 데이터를 기존 캐시와 비교한다:

```ts
// 잘못된 방식: 내부 객체가 같은 참조
const newData = [...previous] // 새 배열이지만
session.status = "DONE" // 같은 객체를 변경

// React Query: "newData[0] === cache[0]이네? 변경 없음!"
// → 기존 캐시 참조 유지 → useQuery 구독자에게 알림 안 함
```

```ts
// 올바른 방식: 변경 경로에 새 참조 생성
const newData = previous.map((s) => (s.id === targetId ? { ...s, status: "DONE" } : s))

// React Query: "newData[0] !== cache[0]이네? 변경됨!"
// → 새 참조로 캐시 업데이트 → useQuery 구독자에게 알림
```

### 왜 이렇게 동작하나? (최적화)

불변 업데이트를 제대로 했다면, structural sharing은 **변경되지 않은 부분을 재사용**해서 메모리를 절약한다:

```
syllabus[2].sessionsByTopic[1].sessions[0].status 를 변경한다면:

syllabus[0] ──────────────────► 그대로 (참조 유지) ← React가 스킵
syllabus[1] ──────────────────► 그대로 (참조 유지) ← React가 스킵
syllabus[2] ──────────────────► 새 객체 ← React가 리렌더
    └─ sessionsByTopic[0] ────► 그대로 (참조 유지)
    └─ sessionsByTopic[1] ────► 새 객체
        └─ sessions[0] ───────► 새 객체 ← 실제 변경 대상
        └─ sessions[1] ───────► 그대로 (참조 유지)
```

## 결론

| 방식                        | 최상위 배열 | 중간 객체들           | 변경된 객체             |
| --------------------------- | ----------- | --------------------- | ----------------------- |
| `[...previous]` + 직접 변경 | 새 참조 ✓   | 같은 참조 ✗           | 같은 참조 (값만 변경) ✗ |
| manual spread / immer       | 새 참조 ✓   | 변경 경로만 새 참조 ✓ | 새 참조 ✓               |

**해결책**: manual spread 또는 immer를 사용해서 변경 경로의 모든 객체에 새 참조를 만들어야 한다.
