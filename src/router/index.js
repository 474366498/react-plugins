import { lazy, Suspense } from "react"

function lazyLoad(Com) {
  return (
    <Suspense><Com /> </Suspense>
  )
}

export const routes = [
  {
    path: '/',
    children: [
      {
        path: '/',
        element: lazyLoad(lazy(() => import('../components/tab'))),
        children: [
          { path: 'home', element: lazyLoad(lazy(() => import('../page/home'))) },
          // { path: 'test', element: lazyLoad(lazy(() => import('../page/file/autoCrop/index.jsx'))) },
          { path: 'new', element: lazyLoad(lazy(() => import('../page/new'))) },
          { path: 'buriedPoint', element: lazyLoad(lazy(() => import('../page/base/buriedPoint'))) },
          { path: 'webWorker', element: lazyLoad(lazy(() => import('../page/base/webWorker'))) },
          { path: 'encrypt', element: lazyLoad(lazy(() => import('../page/base/encrypt'))) },
          { path: 'musicPlayer', element: lazyLoad(lazy(() => import('../page/media/musicPlayer'))) },
          { path: '', element: lazyLoad(lazy(() => import('../page/error'))) },
          { path: '*', element: lazyLoad(lazy(() => import('../page/error'))) },
          // {path:'*',element}
        ]
      },

    ]
  }
]