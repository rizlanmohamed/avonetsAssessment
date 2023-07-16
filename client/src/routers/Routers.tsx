import { Routes, Route } from 'react-router-dom'
import { routes } from './routeConfig'

const Routers: React.FC = () => {
  return (
        <Routes>
           {
            routes.map((route, i) => {
              return (
                <Route key={i} path={route.path} element={<route.component />} />
              )
            })
           }
        </Routes>
  )
}

export default Routers