import './App.css'
import MainHeader from './common/MainHeader'
import MainFooter from './common/MainFooter'
import MainNav from './common/MainNav'
import Inicio from './pages/Inicio'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Inversiones from './pages/Inversiones'
import Proveedores from './pages/Proveedores'
import Empleados from './pages/Empleados'
import Tienda from './pages/Tienda'
import ProductoDetalles from './pages/ProductoDetalles'
import Carrito from './pages/Carrito'
import Directores from './pages/Directores'
import Pagina404 from './pages/Pagina404'
import Pedidos from './pages/Pedidos'
import PedidoDetalles from './pages/PedidoDetalles'
import Seleccionados from './pages/Seleccionados'

function App() {

  return (
    <>{/*Es una etiqueta vacia*/}
      <BrowserRouter>
        <MainHeader />
        <MainNav />

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inversiones" element={<Inversiones />} />
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/directores" element={<Directores />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/empleadoseleccionado" element={<Seleccionados />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/productodetalles/:idproducto" element={<ProductoDetalles />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/pedidodetalles/:idpedido" element={<PedidoDetalles />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="*" element={<Pagina404 />} />
        </Routes>

        <MainFooter />
      </BrowserRouter>
    </>
  )
}

export default App
