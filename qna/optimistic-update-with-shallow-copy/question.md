# 같은 쿼리의 낙관적 업데이트가 일부만 실패함

- 발생 시각: 2026-01-28 17:17
- 문제: 같은 쿼리에서 낙관적 업데이트가 성공했는데 반영이 안 되는 곳이 있음
- 해결 시각:

## 배경

- ColumnSection 에서 useQuery
- ColumnSection -> Column -> Session
- Session에서 낙관적 업데이트 -> Session 스타일이 즉각적으로 바뀜 -> 그러나 해당 Session이 다른 Column으로 이동하지 않음

## 분석

### 실패 원인

- shallow copy 때문인가?

#### 기존 코드

- shallow update로 queryData의 참조 주소를 바꾸려 함

```ts
const newData = [...previous]
const syllabus = newData.find((elSyllabus) => elSyllabus.id === syllabus_id)
const sessionsByTopic = syllabus?.sessionsByTopicArray.find(
    (elSessionsByTopic) => elSessionsByTopic.title === startingTopicTitle
)
const session = sessionsByTopic?.conciseSessionArray.find((elConciseSession) => elConciseSession.id === session_id)
if (!session) throw ClientError.Unexpected("묶음을 찾지 못했어요")
session.completed_at = completed_at
```

#### 로그

- 그러나 queryData를 받는 `ProgressColumnSection`이 업데이트 되지 않음

```
arbor:mutation useSimpleMutation onMutate +27s {url: '/progress/session/assigned', queryKey: Array(2), additionalData: {…}}
index.ts:31 arbor:mutation useStatusMutation update +0ms {additionalData: {…}}
index.ts:49 arbor:mutation useStatusMutation update result +0ms {newData: Array(1)}
index.ts:34 arbor:mutation useSimpleMutation onMutate setQueryData +0ms {queryKey: Array(2), newData: Array(1)}
index.tsx:164 arbor:render ProgressSession 76 status=HOMEWORK completed_at=null +26s
```

### 해결책

#### deep clone

- even clones unnecessary things, performance issue

```ts
const newData = structuredClone(previous)
```

#### manual spread

- one chunk, hard to debug in between
- hard to write, hard to read

- TIP: 인라인 삼항 연산자를 쓰지 마라
- TIP: 대신 코드 브록 안에서 얼리 리턴을 사용해라

```ts
const newData = previous.map((syllabus) => {
    if (syllabus.id !== syllabus_id) return syllabus
    return {
        ...syllabus,
        sessionsByTopicArray: syllabus.sessionsByTopicArray.map((sessionsByTopic) => {
            if (sessionsByTopic.title !== startingTopicTitle) return sessionsByTopic
            return {
                ...sessionsByTopic,
                conciseSessionArray: sessionsByTopic.conciseSessionArray.map((session) => {
                    if (session.id !== session_id) return session
                    return { ...session, status, assigned_at: ... }
                }),
            }
        }),
    }
})
```

#### immer

- 기존 코드를 produce 안에 넣고, newData가 아니라 draft를 mutate하도록 바꾸면 끝

```ts
const newData = produce(previous, (draft) => {
    const syllabus = draft.find((elSyllabus) => elSyllabus.id === syllabus_id)
    const sessionsByTopic = syllabus?.sessionsByTopicArray.find(
        (elSessionsByTopic) => elSessionsByTopic.title === startingTopicTitle
    )
    const session = sessionsByTopic?.conciseSessionArray.find((elConciseSession) => elConciseSession.id === session_id)
    if (!session) throw ClientError.Unexpected("묶음을 찾지 못했어요")
    session.completed_at = completed_at
})
```

## 의문: 왜 query data가 달라졌는데 업데이트가 안 될까?

- 참조 주소가 변하지 않았나? -> 변했다

```ts
const newData = [...previous]
console.log(Object.is(newData, previous)) // prints false
debugger
```
