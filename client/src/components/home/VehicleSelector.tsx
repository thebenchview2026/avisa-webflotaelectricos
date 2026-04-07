"use client";
import { useState } from "react";

export default function VehicleSelector() {
  const [tipoVehiculo, setTipoVehiculo] = useState("");
  const [presupuesto, setPresupuesto] = useState("");
  const [prioridad, setPrioridad] = useState("");

  return (
    <section id="electricos" className="py-10 sm:py-16 bg-gray-50" data-testid="section-vehicle-selector">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3" data-testid="text-selector-title">
            Encuentra tu vehículo ideal
          </h2>
          <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Selecciona tus preferencias y recibe recomendaciones personalizadas
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 max-w-5xl mx-auto">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex sm:block items-center gap-3">
            <label className="block text-sm font-semibold text-gray-700 mb-0 sm:mb-3 whitespace-nowrap sm:whitespace-normal min-w-[100px] sm:min-w-0">
              Tipo de vehículo
            </label>
            <select
              value={tipoVehiculo}
              onChange={(e) => setTipoVehiculo(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ad023b] focus:border-transparent text-sm cursor-pointer pr-8"
              data-testid="select-tipo-vehiculo"
            >
              <option value="">Seleccionar...</option>
              <option value="sedan">Sedán / Berlina</option>
              <option value="suv">SUV / Crossover</option>
              <option value="compacto">Compacto urbano</option>
              <option value="familiar">Familiar / Station Wagon</option>
              <option value="deportivo">Deportivo</option>
            </select>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex sm:block items-center gap-3">
            <label className="block text-sm font-semibold text-gray-700 mb-0 sm:mb-3 whitespace-nowrap sm:whitespace-normal min-w-[100px] sm:min-w-0">
              Presupuesto
            </label>
            <select
              value={presupuesto}
              onChange={(e) => setPresupuesto(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ad023b] focus:border-transparent text-sm cursor-pointer pr-8"
              data-testid="select-presupuesto"
            >
              <option value="">Seleccionar...</option>
              <option value="20-30k">20.000€ - 30.000€</option>
              <option value="30-40k">30.000€ - 40.000€</option>
              <option value="40-50k">40.000€ - 50.000€</option>
              <option value="50k+">Más de 50.000€</option>
            </select>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex sm:block items-center gap-3">
            <label className="block text-sm font-semibold text-gray-700 mb-0 sm:mb-3 whitespace-nowrap sm:whitespace-normal min-w-[100px] sm:min-w-0">
              Prioridad
            </label>
            <select
              value={prioridad}
              onChange={(e) => setPrioridad(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ad023b] focus:border-transparent text-sm cursor-pointer pr-8"
              data-testid="select-prioridad"
            >
              <option value="">Seleccionar...</option>
              <option value="autonomia">Máxima autonomía</option>
              <option value="precio">Mejor precio</option>
              <option value="prestaciones">Prestaciones</option>
              <option value="espacio">Espacio interior</option>
              <option value="tecnologia">Tecnología</option>
            </select>
          </div>
        </div>

        <div className="mt-6 sm:mt-12 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0">
            <div className="hidden sm:flex items-center gap-3 bg-white px-6 py-4 rounded-lg shadow-sm">
              <i className="ri-file-list-3-line text-2xl text-[#ad023b]"></i>
              <div className="text-left">
                <p className="text-sm text-gray-600">¿Necesitas asesoramiento personalizado?</p>
                <a className="text-base font-semibold text-[#ad023b] hover:text-[#8d0230] transition-colors cursor-pointer" href="#contacto" data-testid="link-selector-contacto">
                  Solicita información →
                </a>
              </div>
            </div>
            <a
              href="#contacto"
              className="sm:hidden w-full bg-[#ad023b] text-white py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2"
              data-testid="link-selector-contacto-mobile"
            >
              <i className="ri-customer-service-2-line text-lg" aria-hidden="true"></i>
              Solicitar asesoramiento
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}