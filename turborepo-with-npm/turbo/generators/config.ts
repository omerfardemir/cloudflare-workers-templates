import type { PlopTypes } from "@turbo/gen";
import { Answers } from "./types";
import { npmInstall } from './installers/npm-install'

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setActionType('npmInstall', npmInstall as PlopTypes.CustomActionFunction)

  // create a generator
  plop.setGenerator("create-worker", {
    description: "Create a new worker",
    // gather information from the user
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Worker name",
      }
    ],
    // perform actions based on the prompts
    // Note: The worker depends on the root worker.config.json file for configuration
    actions: (data: any) => {
			const answers = data as Answers
			process.chdir(answers.turbo.paths.root)

			const actions: PlopTypes.Actions = [
				{
					type: 'addMany',
					base: 'templates/basic',
					destination: `workers/{{ name }}`,
					templateFiles: [
						'templates/basic/**/**.hbs',
						'templates/basic/.eslintrc.js.hbs',
					],
				},
				{ type: 'npmInstall' },
			]

			return actions
		},
  });
}