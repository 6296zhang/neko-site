'use client'

export default function Home() {
  const cats = [
    { name: 'Momo', jp: 'もも', breed: 'Scottish Fold', age: '2y', status: 'Available', note: '穏やかで甘えん坊な女の子' },
    { name: 'Sora', jp: 'そら', breed: 'American Shorthair', age: '3y', status: 'Reserved', note: '好奇心旺盛でやんちゃな男の子' },
    { name: 'Kinako', jp: 'きなこ', breed: 'Maine Coon', age: '1y', status: 'Available', note: 'ふわふわの毛並みが自慢の子' },
    { name: 'Yuki', jp: 'ゆき', breed: 'Ragdoll', age: '4y', status: 'Available', note: '静かで落ち着いた癒し系' },
  ]

  const features = [
    {
      index: '01',
      title: 'Adoption',
      jp: 'お迎え',
      desc: 'すべての猫は健康診断・ワクチン接種済み。お迎え後もサポートチームが継続してフォロー。',
    },
    {
      index: '02',
      title: 'Café & Visit',
      jp: 'カフェ・見学',
      desc: '予約なしでご来店いただけます。猫たちと過ごす静かな時間を、日常のなかに。',
    },
    {
      index: '03',
      title: 'Community',
      jp: 'コミュニティ',
      desc: 'お迎えいただいたご家族のネットワーク。近況報告や相談ができる場があります。',
    },
  ]

  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>

      {/* ─── NAV ─── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        backgroundColor: 'rgba(247,245,242,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{
          maxWidth: '1120px', margin: '0 auto',
          padding: '0 40px',
          height: '60px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '28px', height: '28px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C7 2 3 6.5 3 11c0 3 1.5 5.5 4 7l1 4h8l1-4c2.5-1.5 4-4 4-7 0-4.5-4-9-9-9z" fill="white"/>
              </svg>
            </div>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', fontWeight: 400, letterSpacing: '0.04em', color: 'var(--text-primary)' }}>
              ねこ堂
            </span>
          </div>

          <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            {['お迎え', 'カフェ', '猫たち', 'について'].map(item => (
              <a key={item} href="#" style={{
                fontSize: '13px', color: 'var(--text-secondary)',
                textDecoration: 'none', letterSpacing: '0.04em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {item}
              </a>
            ))}
            <a href="#" style={{
              fontSize: '13px', fontWeight: 500,
              color: 'var(--accent)',
              textDecoration: 'none',
              letterSpacing: '0.04em',
              padding: '7px 18px',
              border: '1px solid var(--accent)',
              borderRadius: '4px',
            }}>
              見学予約
            </a>
          </nav>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section style={{
        paddingTop: '120px',
        paddingBottom: '100px',
        maxWidth: '1120px',
        margin: '0 auto',
        padding: '140px 40px 100px',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

          {/* Text */}
          <div>
            <p style={{
              fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em',
              color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '24px',
            }}>
              Tokyo · Since 2018
            </p>
            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '52px', lineHeight: '1.2', fontWeight: 300,
              color: 'var(--text-primary)', marginBottom: '28px',
              letterSpacing: '-0.01em',
            }}>
              猫と人が<br />
              <em style={{ fontStyle: 'normal', fontWeight: 600 }}>出会う場所</em>
            </h1>
            <p style={{
              fontSize: '15px', lineHeight: '1.8', color: 'var(--text-secondary)',
              maxWidth: '420px', marginBottom: '40px',
            }}>
              ねこ堂は、保護猫のお迎えと日常ケアを中心に、猫と人の暮らしをていねいにつなぐ場所です。東京・代官山にて運営中。
            </p>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <a href="#" style={{
                display: 'inline-block',
                padding: '13px 28px',
                backgroundColor: 'var(--text-primary)',
                color: '#fff',
                fontSize: '13px', fontWeight: 500,
                textDecoration: 'none',
                borderRadius: '4px',
                letterSpacing: '0.04em',
              }}>
                猫たちを見る
              </a>
              <a href="#" style={{
                display: 'inline-block',
                padding: '13px 24px',
                color: 'var(--text-secondary)',
                fontSize: '13px',
                textDecoration: 'none',
                letterSpacing: '0.04em',
              }}>
                カフェについて →
              </a>
            </div>

            {/* Stats */}
            <div style={{
              display: 'flex', gap: '40px', marginTop: '60px',
              paddingTop: '40px', borderTop: '1px solid var(--border)',
            }}>
              {[['248', '巣立った猫'],['4.9', '平均評価'],['6y+', '運営実績']].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{n}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px', letterSpacing: '0.04em' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image area */}
          <div style={{ position: 'relative' }}>
            <div style={{
              aspectRatio: '4/5',
              backgroundColor: 'var(--accent-light)',
              borderRadius: '8px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ fontSize: '120px', opacity: 0.5 }}>🐈</span>
            </div>
            {/* Tag */}
            <div style={{
              position: 'absolute', bottom: '24px', left: '-20px',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              padding: '14px 20px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            }}>
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '4px', letterSpacing: '0.06em' }}>NOW AVAILABLE</div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>12 cats · 代官山</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        backgroundColor: 'var(--surface)',
      }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '80px 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0' }}>
            {features.map((f, i) => (
              <div key={f.index} style={{
                padding: '40px',
                borderRight: i < 2 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', letterSpacing: '0.08em' }}>{f.index}</span>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.06em' }}>{f.jp}</span>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '16px', letterSpacing: '-0.01em' }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: '13px', lineHeight: '1.9', color: 'var(--text-secondary)' }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATS ─── */}
      <section style={{ maxWidth: '1120px', margin: '0 auto', padding: '100px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
          <div>
            <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '10px' }}>
              Available Now
            </p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: 400, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
              今月のねこたち
            </h2>
          </div>
          <a href="#" style={{ fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none', letterSpacing: '0.04em' }}>
            すべて見る →
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {cats.map((cat) => (
            <div key={cat.name} style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}>
              {/* Photo area */}
              <div style={{
                aspectRatio: '1',
                backgroundColor: 'var(--accent-light)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: '56px', opacity: 0.55 }}>🐱</span>
              </div>
              {/* Info */}
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div>
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', fontWeight: 400, color: 'var(--text-primary)' }}>{cat.jp}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginLeft: '6px', letterSpacing: '0.04em' }}>{cat.name}</span>
                  </div>
                  <span style={{
                    fontSize: '10px', fontWeight: 500,
                    padding: '3px 8px', borderRadius: '3px',
                    letterSpacing: '0.06em',
                    backgroundColor: cat.status === 'Available' ? '#EDF5E9' : '#F5F0E9',
                    color: cat.status === 'Available' ? '#4A7C3F' : '#7C6A3F',
                  }}>
                    {cat.status}
                  </span>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '4px', letterSpacing: '0.02em' }}>
                  {cat.breed} · {cat.age}
                </p>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.6', marginTop: '10px' }}>
                  {cat.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── EDITORIAL ─── */}
      <section style={{
        backgroundColor: 'var(--text-primary)',
        padding: '100px 40px',
      }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '24px' }}>
              Our Philosophy
            </p>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '38px', lineHeight: '1.4', fontWeight: 300,
              color: '#FFFFFF', marginBottom: '28px',
            }}>
              ただそこにいるだけで、<br />
              <em style={{ fontStyle: 'normal', fontWeight: 600 }}>十分な存在。</em>
            </h2>
            <p style={{ fontSize: '14px', lineHeight: '1.9', color: 'rgba(255,255,255,0.55)', maxWidth: '400px' }}>
              猫は何かを"してくれる"から価値があるのではない。そこにいるだけで、空間が変わる。時間が変わる。ねこ堂はそういう関係を、ていねいに育てていきたいと思っています。
            </p>
          </div>
          <div style={{
            aspectRatio: '4/3',
            backgroundColor: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: '80px', opacity: 0.3 }}>🐈‍⬛</span>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ padding: '100px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '20px' }}>
          Visit Us
        </p>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '36px', fontWeight: 300, lineHeight: '1.4',
          color: 'var(--text-primary)', marginBottom: '16px',
        }}>
          代官山で、会いに来てください。
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '40px', letterSpacing: '0.02em' }}>
          東京都渋谷区猿楽町 · 11:00–19:00 · 火曜定休
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <a href="#" style={{
            padding: '14px 32px',
            backgroundColor: 'var(--text-primary)',
            color: '#fff',
            fontSize: '13px', fontWeight: 500,
            textDecoration: 'none',
            borderRadius: '4px',
            letterSpacing: '0.04em',
          }}>
            見学を予約する
          </a>
          <a href="#" style={{
            padding: '14px 28px',
            color: 'var(--text-secondary)',
            fontSize: '13px',
            textDecoration: 'none',
            border: '1px solid var(--border)',
            borderRadius: '4px',
            letterSpacing: '0.04em',
          }}>
            アクセスを確認
          </a>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '40px', }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', color: 'var(--text-tertiary)', letterSpacing: '0.04em' }}>
            ねこ堂 © 2026
          </span>
          <div style={{ display: 'flex', gap: '28px' }}>
            {['プライバシー', '利用規約', 'Instagram', 'お問い合わせ'].map(l => (
              <a key={l} href="#" style={{ fontSize: '12px', color: 'var(--text-tertiary)', textDecoration: 'none', letterSpacing: '0.04em' }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  )
}
