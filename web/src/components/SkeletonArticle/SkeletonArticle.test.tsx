import { render } from '@redwoodjs/testing/web'

import SkeletonArticle from './SkeletonArticle'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SkeletonArticle', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SkeletonArticle />)
    }).not.toThrow()
  })
})
