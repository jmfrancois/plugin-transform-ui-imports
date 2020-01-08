// https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md

const t = require('@babel/types');

const inBootstrap = [
	'Alert',
	'Breadcrumb',
	'BreadcrumbItem',
	'Button',
	'ButtonGroup',
	'ButtonToolbar',
	'Carousel',
	'CarouselItem',
	'Clearfix',
	'ControlLabel',
	'Col',
	'Collapse',
	'Dropdown',
	'DropdownButton',
	'Fade',
	'Form',
	'FormControl',
	'FormGroup',
	'Glyphicon',
	'Grid',
	'HelpBlock',
	'InputGroup',
	'Jumbotron',
	'Label',
	'ListGroup',
	'ListGroupItem',
	'Media',
	'MenuItem',
	'Modal',
	'ModalBody',
	'ModalFooter',
	'ModalHeader',
	'ModalTitle',
	'Nav',
	'Navbar',
	'NavbarBrand',
	'NavDropdown',
	'NavItem',
	'Overlay',
	'OverlayTrigger',
	'PageHeader',
	'PageItem',
	'Pager',
	'Pagination',
	'Panel',
	'PanelGroup',
	'Popover',
	'ProgressBar',
	'Radio',
	'ResponsiveEmbed',
	'Row',
	'SafeAnchor',
	'SplitButton',
	'Tab',
	'TabContainer',
	'TabContent',
	'TabPane',
	'Tabs',
	'Thumbnail',
	'Tooltip',
	'Well',
];

function getPath(name, root) {
	const base = `${root}/lib`;
	if (root === '@talend/react-components') {
		switch (name) {
			case 'Action':
				return `${base}/Actions/Action`;
			case 'Actions':
				return `${base}/Actions/Actions.component`;
			case 'ActionButton':
				return `${base}/Actions/ActionButton`;
			case 'ActionDropdown':
				return `${base}/Actions/ActionDropdown`;
			case 'ActionFile':
				return `${base}/Actions/ActionFile`;
			case 'ActionIconToggle':
				return `${base}/Actions/ActionIconToggle`;
			case 'ActionSplitDropdown':
				return `${base}/Actions/ActionSplitDropdown`;
			case 'RichLayout':
				return `${base}/RichTooltip/RichLayout`;
			case 'RichError':
				return `${base}/RichTooltip/RichError`;
			case 'Checkbox':
				return `${base}/Toggle/Checkbox.component`;
			case 'CIRCULAR_PROGRESS_SIZE':
				return `${base}/constants`;
			case 'I18N_DOMAIN_COMPONENTS':
				return `${base}/constants`;
			// translated bootstrap
			case 'BootstrapBadge':
				return 'react-bootstrap/lib/Badge';
			case 'BootstrapCheckbox':
				return 'react-bootstrap/lib/Checkbox';
			case 'BootstrapTable':
				return 'react-bootstrap/lib/Table';
			default:
				break;
		}
	}

	if (inBootstrap.indexOf(name) !== -1) {
		return `react-bootstrap/lib/${name}`;
	}
	return `${base}/${name}`;
}


module.exports = function transform() {
  return {
    visitor: {
      ImportDeclaration(path) {
        // path.node is the base accessor to AST
        const base = path.node.source.value;
        if (base !== '@talend/react-components' && base !== '@talend/react-containers') return;

        const nbSpec = path.node.specifiers.length;

        path.node.specifiers.forEach((spec, index) => {
          if (spec.type === 'ImportSpecifier') {
            if (index + 1 === nbSpec) {
            } if (index + 1 !== nbSpec) {
              // lets add it
              const source = t.stringLiteral(getPath(spec.imported.name, base));
              const specifier = t.importDefaultSpecifier(t.identifier(spec.local.name));
              const imp = t.importDeclaration([specifier], source);
              path.insertAfter(imp);
            } else {
              // is last so we replace
              path.node.specifiers = [t.importDefaultSpecifier(t.identifier(spec.local.name))];
              path.node.source = t.stringLiteral(getPath(spec.imported.name, base));
            }
          } else {
            console.warn(`WARNING: ${spec.type} are not handled. Bundle size can not be decrease`);
          }
        });
      },
    },
  };
}