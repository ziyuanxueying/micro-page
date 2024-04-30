import pico from 'picocolors'
import { readFileSync } from 'node:fs'
import path from 'path'

const cwd = process.cwd()

const msgPath = path.resolve(cwd, '.git/COMMIT_EDITMSG')
const msg = readFileSync(msgPath, 'utf-8').trim()

const commitRE =
  /^(revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)(\(.+\))?: .{1,50}/

const doc = 'https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html'

if (!commitRE.test(msg) && !/^Merge/.test(msg)) {
  console.log()
  console.error(
    `  ${pico.white(pico.bgRed(' ERROR '))} ${pico.red(`invalid commit message format.`)}\n\n` +
      pico.red(
        `  Proper commit message format is required for automated changelog generation. Examples:\n\n`,
      ) +
      `    ${pico.green(`${pico.blue(pico.bold('feat(模块):'))} 添加了个很棒的功能`)}\n` +
      `    ${pico.green(`${pico.blue(pico.bold('fix(模块):'))} 修复了一些 bug`)}\n` +
      `    ${pico.green(`${pico.blue(pico.bold('docs(模块):'))} 更新了一下文档`)}\n` +
      `    ${pico.green(`${pico.blue(pico.bold('chore(模块):'))} 对脚手架做了些更改`)}\n\n` +
      pico.red(`  See '${doc}' for more details.\n`),
  )
  process.exit(1)
}
