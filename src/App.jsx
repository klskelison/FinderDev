import { useState } from 'react'





function App() {

  const [searchQuery, setSearchQuery] = useState('');

  const [userData, setUserData] = useState(null);

  async function gerenciarBusca() {
    if (searchQuery.trim() === '') {
      alert("Por favor, digite um username válido do GitHub.");
      return;
    }

    try {
      const resposta = await fetch(`https://api.github.com/users/${searchQuery}`);
      const dados = await resposta.json();

      console.log(dados);

      setUserData(dados);

    } catch (erro) {
      console.error("Erro ao buscar usuário:", erro);
      alert("Ocorreu um erro ao buscar o usuário. Por favor, tente novamente.");
    }


  }



  return (
    <div className="min-h-screen bg-[#141d2f] text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl flex flex-col gap-6">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wider text-slate-100">Buscar desenvolvedor..</h1>
        </header>

        <section className="bg-[#1e2a47] rounded-2xl p-2 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3 pl-3 w-full">
            <span className="text-xl">🔍</span>

            <input type="text" placeholder="Digite o username do github..."
              className="bg-transparent w-full text-slate-200 placeholder-slate-400 focus:outline-none text-sm md:text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button onClick={gerenciarBusca} className="bg-blue-500 hover:bg-blue-600 transition-colors text-white font-bold py-3 px-5 rounded-xl text-sm">
            Buscar
          </button>
        </section>

        {/* 4. CARD PRINCIPAL (Dados do Perfil) */}
        {userData === null ? (
          <p className="text-center text-slate-400 mt-10">Busque um usuário do GitHub para ver o perfil.</p>
        ) : (
         

            <main className="bg-[#1e2a47] rounded-2xl p-6 md:p-10 shadow-lg flex flex-col md:flex-row gap-8">

              {/* Espaço da Foto de Perfil */}
              <div className="flex justify-center md:block">
                <img
                  src={userData.avatar_url}
                  alt={`Avatar de ${userData.name}`}
                  className="w-28 h-28 rounded-full border-4 border-[#141d2f]"
                />
              </div>

              {/* O restante das informações (Nome, bio, etc.) vai entrar aqui dentro */}
              <div className="flex-1">
                {/* Nome, Username e Data de Cadastro */}
                <div className="flex flex-col md:flex-row md:justify-between items-start gap-1 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-100">{userData.name} || {userData.login}</h2>
                    <p className="text-blue-400 text-sm">@{userData.login}</p>
                  </div>
                  <p className="text-slate-400 text-sm md:pt-2">{userData.created_at && new Date(userData.created_at).toLocaleDateString()}</p>
                </div>

                {/* Biografia do Usuário */}
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {userData.bio || "Esta usuário não possui uma biografia."}
                </p>
                <div className="bg-[#141d2f] rounded-xl p-4 flex justify-around md:justify-between shadow-inner mb-6">
                  <div className="flex flex-col items-center md:items-start">
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Repositórios</p>
                    <p className="text-xl font-bold text-slate-100">{userData.public_repos || 0}</p>
                  </div>
                  {/* Coluna: Seguidores */}
                  <div className="flex flex-col items-center md:items-start">
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Seguidores</p>
                    <p className="text-xl font-bold text-slate-100">{userData.followers || 0}</p>
                  </div>

                  {/* Coluna: Seguindo */}
                  <div className="flex flex-col items-center md:items-start">
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Seguindo</p>
                    <p className="text-xl font-bold text-slate-100">{userData.following || 0}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-400">
                  {/* Item 1: Localização */}
                  <div className="flex items-center gap-2">
                    <span className="text-base">📍</span>
                    <span>{userData.location || "Localização não informada"}</span>
                  </div>

                  {/* Item 2: Link do Blog/Site */}
                  <div className="flex items-center gap-2">
                    <span className="text-base">🔗</span>
                    <a
                      href={userData.blog || "#"}
                      target="_blank"
                      className="hover:underline text-blue-400"
                    >
                      {userData.blog || "Blog não informado"}
                    </a>
                  </div>

                </div>


              </div>

            </main>)}
        </div>




    </div>
      )
}

      export default App
