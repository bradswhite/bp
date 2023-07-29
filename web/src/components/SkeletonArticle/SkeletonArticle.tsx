import { clsx } from 'clsx';

const SkeletonArticle = () => {
  return (
    <article
      className={clsx(
        'max-w-md rounded-lg p-4 md:w-full',
        'bg-white dark:bg-gray-700',
        'border border-gray-200 dark:border-gray-600 shadow-xl',
        'animate-pulse'
      )}
    >
      <div className='h-2 rounded bg-gray-900 dark:bg-gray-100'></div>
      <div className='mt-2 h-2 rounded bg-gray-800 dark:bg-gray-400'></div>
      <div className='mt-2 h-2 rounded bg-gray-600 dark:bg-gray-500'></div>
    </article>
  )
}

export default SkeletonArticle
