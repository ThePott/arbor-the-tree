local autocmd = vim.api.nvim_create_autocmd

_G.my_format_on_save = true -- an escape hatch so I can turn this functionality on/off

local function organize_imports()
	local ft = vim.bo.filetype:gsub("react$", "")
	if not vim.tbl_contains({ "javascript", "typescript" }, ft) then
		return
	end
	local ok = vim.lsp.buf_request_sync(0, "workspace/executeCommand", {
		command = (ft .. ".organizeImports"),
		arguments = { vim.api.nvim_buf_get_name(0) },
	}, 3000)
	if not ok then
		print("Command timeout or failed to complete.")
	end
end

autocmd("BufWritePre", {
	pattern = { "*.css", "*.html", "*.js", "*.jsx", "*.json", "*.ts", "*.tsx" },
	callback = function()
		if not _G.my_format_on_save then
			return
		end
		require("conform").format({ async = false })
		organize_imports()
	end,
})
