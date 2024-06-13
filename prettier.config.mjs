/** @type {Partial<import('prettier').Config>} */
const prettierConfig = {
    printWidth: 100,
    tabWidth: 4,
    useTabs: false,
    semi: false,
    singleQuote: true,
    quoteProps: 'as-needed',
    jsxSingleQuote: false,
    trailingComma: 'all',
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: 'avoid',
    endOfLine: 'lf',
    singleAttributePerLine: false,
}

/** @type {Partial<import('prettier-plugin-tailwindcss').PluginOptions>} */
const tailwindOptions = {
    tailwindAttributes: ['class', 'className', 'class:list', 'theme'],
    tailwindFunctions: ['clsx', 'twMerge', 'createTheme'],
}

/** @type {Partial<import('@trivago/prettier-plugin-sort-imports').PluginConfig>} */
const importSortOptions = {
    importOrder: [
        '^[^\\.~].*\\.css$',
        '^[\\.~]\\/.*\\.css$',
        '^node:(.*)$',
        '<THIRD_PARTY_MODULES>',
        'shared',
        '^~/(.*)$',
        '^[./]',
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
    importOrderGroupNamespaceSpecifiers: true,
    importOrderCaseInsensitive: false,
}

/** @type {Partial<import('prettier-plugin-jsdoc').JsdocOptions>} */
const jsdocOptions = {
    jsdocSpaces: 1,
    jsdocDescriptionWithDot: false,
    jsdocDescriptionTag: false,
    jsdocVerticalAlignment: false,
    jsdocKeepUnParseAbleExampleIndent: false,
    jsdocCommentLineStrategy: 'singleLine',
    jsdocSeparateReturnsFromParam: false,
    jsdocSeparateTagGroups: false,
    jsdocAddDefaultToDescription: false,
    jsdocCapitalizeDescription: false,
    jsdocPreferCodeFences: false,
    tsdoc: false,
    jsdocLineWrappingStyle: 'greedy',
}

const cssOrderOptions = {
    cssDeclarationSorterKeepOverrides: false,
}

/** @type {import('prettier').Config['plugins']} */
const plugins = [
    'prettier-plugin-packagejson',
    'prettier-plugin-astro',
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-jsdoc',
    'prettier-plugin-css-order',
    'prettier-plugin-tailwindcss',
]

/** @type {import('prettier').Config['overrides']} */
const overrides = [
    {
        files: '*.astro',
        options: {
            parser: 'astro',
            astroAllowShorthand: true,
            astroSkipFrontmatter: false,
        },
    },
]

export default Object.assign(
    {},
    { plugins },
    { overrides },
    prettierConfig,
    tailwindOptions,
    importSortOptions,
    jsdocOptions,
    cssOrderOptions,
)
