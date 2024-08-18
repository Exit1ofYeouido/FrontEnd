import React from "react";
import { RouterProvider, Route, Routes, BrowserRouter } from "react-router-dom";
import mainRouter, { routerObj } from "./routers/router";
import './index.css'; // 또는 './App.css'를 이미 사용 중이라면 해당 파일을 import

function renderRoutes(routesObj) {
  return routesObj.map((route) => {
    if (route.children) {
      return (
        <Route
          key={route.path}
          path={route.path}
          index={route.index}
          element={route.element}
        >
          {route.children ? renderRoutes(route.children) : null}
        </Route>
      );
    }
    return (
      <Route
        key={route.path}
        path={route.path}
        index={route.index}
        element={route.element}
      />
    );
  });
}

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>{renderRoutes(routerObj)}</Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
