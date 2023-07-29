// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof SkeletonArticle> = (args) => {
//   return <SkeletonArticle {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import SkeletonArticle from './SkeletonArticle'

export const generated = () => {
  return <SkeletonArticle />
}

export default {
  title: 'Components/SkeletonArticle',
  component: SkeletonArticle,
} as ComponentMeta<typeof SkeletonArticle>
