'use client';

import { useRecipes } from '@/hooks/useRecipes';

export function RecipesPageClient({ initialRecipes }) {
  const {
    recipes,
    loading,
    error,
    refetch,
  } = useRecipes({
    initialRecipes,
    // Como já recebemos dados via SSR, não precisamos de fetch automático.
    fetchOnMount: initialRecipes.length === 0,
  });

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-zinc-50 px-4 py-10 font-sans dark:bg-black">
      <main className="w-full max-w-3xl rounded-xl bg-white p-8 shadow-sm dark:bg-zinc-900">
        <header className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              Receitas
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Lista consumindo a API de receitas com SSR + hook de dados.
            </p>
          </div>
          <button
            type="button"
            onClick={refetch}
            className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Recarregar
          </button>
        </header>

        {loading && (
          <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-300">
            Carregando receitas...
          </p>
        )}

        {error && (
          <p className="mb-4 text-sm text-red-600 dark:text-red-400">
            Erro ao carregar receitas: {error}
          </p>
        )}

        {recipes.length === 0 && !loading && !error && (
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Nenhuma receita cadastrada ainda.
          </p>
        )}

        <ul className="space-y-4">
          {recipes.map((recipe) => (
            <li
              key={recipe.id}
              className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
            >
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {recipe.title}
              </h2>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {recipe.description}
              </p>
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
                Tempo de preparo: {recipe.prepTime} minutos
              </p>
              {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 && (
                <div className="mt-3">
                  <h3 className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">
                    Ingredientes
                  </h3>
                  <ul className="mt-1 list-disc space-y-0.5 pl-5 text-xs text-zinc-600 dark:text-zinc-300">
                    {recipe.ingredients.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

