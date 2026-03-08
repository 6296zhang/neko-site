export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#fdf6f0' }}>

      {/* NAV */}
      <nav className="flex items-center justify-between px-8 py-5" style={{ borderBottom: '1px solid #f8b4c8' }}>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🐾</span>
          <span className="text-lg font-bold" style={{ color: '#2d2d2d', letterSpacing: '0.05em' }}>ねこ堂</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm" style={{ color: '#9b8ea0' }}>
          <a href="#" className="hover:text-pink-400 transition-colors">について</a>
          <a href="#" className="hover:text-pink-400 transition-colors">ねこたち</a>
          <a href="#" className="hover:text-pink-400 transition-colors">ギャラリー</a>
          <a href="#" className="hover:text-pink-400 transition-colors">お問い合わせ</a>
        </div>
        <button
          className="text-sm px-5 py-2 rounded-full transition-all"
          style={{ backgroundColor: '#f8b4c8', color: '#fff', fontWeight: 500 }}
        >
          会員登録
        </button>
      </nav>

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center text-center pt-24 pb-20 px-6 overflow-hidden">

        {/* bg blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-20 blur-3xl" style={{ backgroundColor: '#f8b4c8', transform: 'translate(-30%, -30%)' }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-15 blur-3xl" style={{ backgroundColor: '#fde8f0', transform: 'translate(30%, 30%)' }} />

        {/* floating cat emoji */}
        <div className="float text-9xl mb-6 select-none">🐱</div>

        <h1 className="fade-up text-5xl md:text-6xl font-bold mb-4 leading-tight" style={{ color: '#2d2d2d', animationDelay: '0.1s', opacity: 0 }}>
          ようこそ、<span style={{ color: '#f8b4c8' }}>ねこ堂</span>へ
        </h1>
        <p className="fade-up text-lg md:text-xl mb-2" style={{ color: '#9b8ea0', animationDelay: '0.3s', opacity: 0 }}>
          猫と過ごす、やさしい時間。
        </p>
        <p className="fade-up text-sm mb-10" style={{ color: '#c5b8c9', animationDelay: '0.4s', opacity: 0 }}>
          A cozy little corner for cat lovers 🌸
        </p>

        <div className="fade-up flex gap-4 flex-wrap justify-center" style={{ animationDelay: '0.5s', opacity: 0 }}>
          <button
            className="px-8 py-3 rounded-full text-white font-medium text-sm transition-transform hover:scale-105 shadow-lg"
            style={{ background: 'linear-gradient(135deg, #f8b4c8, #f0a0c0)' }}
          >
            ねこに会いに行く 🐾
          </button>
          <button
            className="px-8 py-3 rounded-full text-sm font-medium transition-transform hover:scale-105"
            style={{ border: '1.5px solid #f8b4c8', color: '#f8b4c8', backgroundColor: 'transparent' }}
          >
            もっと知る →
          </button>
        </div>

        {/* paw prints */}
        <div className="flex gap-3 mt-14 opacity-30">
          {['🐾','🐾','🐾','🐾','🐾'].map((p, i) => (
            <span key={i} className="text-xl" style={{ transform: `rotate(${i % 2 === 0 ? '-15deg' : '15deg'})`, opacity: 1 - i * 0.15 }}>{p}</span>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-center text-2xl font-bold mb-2" style={{ color: '#2d2d2d' }}>ねこ堂でできること</h2>
        <p className="text-center text-sm mb-12" style={{ color: '#c5b8c9' }}>What you can do here</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '📸', title: 'ねこギャラリー', sub: 'Cat Gallery', desc: 'かわいいねこたちの写真をたっぷり楽しめます。毎日新しい子が登場！' },
            { icon: '🏠', title: 'お家探し', sub: 'Find a Home', desc: 'お迎えを待っているねこたちをご紹介。あなたにぴったりの子に出会えるかも。' },
            { icon: '☕', title: 'ねこカフェ', sub: 'Neko Café', desc: '予約不要のねこカフェ情報。ゆっくりお茶しながらねこと触れ合えます。' },
          ].map((card, i) => (
            <div
              key={i}
              className="rounded-3xl p-7 transition-transform hover:-translate-y-1 hover:shadow-lg"
              style={{ backgroundColor: '#fff', border: '1px solid #fde8f0' }}
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <div className="font-bold text-base mb-1" style={{ color: '#2d2d2d' }}>{card.title}</div>
              <div className="text-xs mb-3" style={{ color: '#f8b4c8' }}>{card.sub}</div>
              <p className="text-sm leading-relaxed" style={{ color: '#9b8ea0' }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATS SHOWCASE */}
      <section className="py-16 px-6" style={{ backgroundColor: '#fde8f0' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-2xl font-bold mb-2" style={{ color: '#2d2d2d' }}>今月のねこたち</h2>
          <p className="text-center text-sm mb-12" style={{ color: '#c5b8c9' }}>Cats of the month</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { emoji: '😸', name: 'もも', breed: 'スコティッシュ', age: '2歳' },
              { emoji: '😺', name: 'そら', breed: 'アメリカンショートヘア', age: '3歳' },
              { emoji: '🙀', name: 'きなこ', breed: 'メインクーン', age: '1歳' },
              { emoji: '😻', name: 'ゆき', breed: 'ラグドール', age: '4歳' },
            ].map((cat, i) => (
              <div
                key={i}
                className="rounded-3xl p-6 text-center transition-transform hover:-translate-y-1 cursor-pointer"
                style={{ backgroundColor: '#fff' }}
              >
                <div className="text-5xl mb-3">{cat.emoji}</div>
                <div className="font-bold text-base mb-1" style={{ color: '#2d2d2d' }}>{cat.name}</div>
                <div className="text-xs mb-1" style={{ color: '#f8b4c8' }}>{cat.breed}</div>
                <div className="text-xs" style={{ color: '#c5b8c9' }}>{cat.age}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <div className="text-5xl mb-6">🌸</div>
        <h2 className="text-3xl font-bold mb-4" style={{ color: '#2d2d2d' }}>ねこと一緒に、はじめよう。</h2>
        <p className="text-sm mb-8" style={{ color: '#9b8ea0' }}>Start your journey with cats today.</p>
        <button
          className="px-10 py-4 rounded-full text-white font-medium transition-transform hover:scale-105 shadow-lg text-sm"
          style={{ background: 'linear-gradient(135deg, #f8b4c8, #f0a0c0)' }}
        >
          無料で始める 🐾
        </button>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 text-center text-xs" style={{ borderTop: '1px solid #fde8f0', color: '#c5b8c9' }}>
        <div className="mb-2">🐾 ねこ堂 © 2026</div>
        <div className="flex justify-center gap-6">
          <a href="#" className="hover:text-pink-400 transition-colors">プライバシーポリシー</a>
          <a href="#" className="hover:text-pink-400 transition-colors">利用規約</a>
          <a href="#" className="hover:text-pink-400 transition-colors">お問い合わせ</a>
        </div>
      </footer>

    </main>
  )
}
