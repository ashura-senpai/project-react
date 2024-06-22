"use client"

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import CardSection from "@/components/CardSection";
import Image from 'next/image';

export default function Evolucoes() {
  const searchParams = useSearchParams();
  const evolucao = searchParams.get('evolucao');
  const [pokeData, setPokeData] = useState<any>(null);

  const Evolucoes = () => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Evolucoes/>
      </Suspense>
    );
  };

  useEffect(() => {
    if (evolucao) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${evolucao.toLowerCase()}`)
        .then(response => response.json())
        .then(data => setPokeData(data));
    }
  }, [evolucao]);

  if (!evolucao) {
    return <p>Evolução não especificada</p>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {pokeData ? (
        <CardSection titulo={evolucao}>
          <img src={pokeData.sprites.front_default} alt={evolucao} />
        </CardSection>
      ) : (
        <p>Carregando...</p>
      )}
    </main>
  );
}