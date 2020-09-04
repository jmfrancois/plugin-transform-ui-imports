const pluginTester = require('babel-plugin-tester').default;
const babelPlugin = require('.');

pluginTester({
	plugin: babelPlugin,
	pluginName: 'module:@talend/babel-plugin-transform-ui-imports',
	tests: [
		{
			code: `
			import { SidePanel, Actions, ActionButton, ActionDropdown, List } from '@talend/react-components';`,
		output: `
			import List from "@talend/react-components/lib/List";
			import ActionDropdown from "@talend/react-components/lib/Actions/ActionDropdown";
			import ActionButton from "@talend/react-components/lib/Actions/ActionButton";
			import Actions from "@talend/react-components/lib/Actions/Actions.component";
			import SidePanel from "@talend/react-components/lib/SidePanel";`
		},
		{
			code: `
			import getLocale from '@talend/react-components/lib/DateFnsLocale/locale';`,
			output: `
			import getLocale from "@talend/react-components/lib/DateFnsLocale/locale";`
		},
		{
			code: `
			import {getLocale} from '@talend/react-components';`,
			output: `
			import getLocale from "@talend/react-components/lib/DateFnsLocale/locale";`
		},
		{
			code: `import React from 'react';`,
			output: `import React from "react";`,
		},
		// {
		// 	code: `
		// 		import React from 'react';
        //         import { SidePanel } from '@talend/react-components';
		// 		import { ModelViewer as ModelViewerComponent } from '@talend/react-components';`,
		// 	output: `
		// 		import React from 'react';
		// 		import { SidePanel, ModelViewer as ModelViewerComponent } from '@talend/react-components';`,
		// },
		// {
		// 	code:
		// 		"import { RecordsViewer as RecordsViewerComponent, TooltipTrigger } from '@talend/react-components';",
		// 	output:
		// 		"import { RecordsViewer as RecordsViewerComponent, TooltipTrigger } from '@talend/react-components';",
		// },
		// {
		// 	code: "import * as allComponents from '@talend/react-components';",
		// 	output: "import * as allComponents from '@talend/react-components';",
		// },
		// {
		// 	code: "import * as allComponents from '@talend/react-components';",
		// 	output: "import * as allComponents from '@talend/react-components';",
		// },
	],
});
