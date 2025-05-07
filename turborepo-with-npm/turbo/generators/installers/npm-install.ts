import type { PlopTypes } from '@turbo/gen'
import type { Answers } from '../types'
import { exec } from 'node:child_process'

export function npmInstall(answers: Answers, _config: any, _plop: PlopTypes.NodePlopAPI) {
	return new Promise<string>((resolve, reject) => {
		console.log('🌀 running npm install...')

		exec(`npm install`, {
			cwd: answers.turbo.paths.root,
		})
			.on('exit', (code) => {
				if (code === 0) {
					resolve('npm install ran successfully')
				} else {
					reject(new Error(`npm install failed with code ${code}`))
				}
			})
			.on('error', (error) => {
				reject(error)
			})
		})
}