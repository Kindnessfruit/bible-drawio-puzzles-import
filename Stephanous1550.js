const hbsc = hbs_('bc_n')

async function initialise() {

  const sdir = window.location.search

  console.log(sdir);

  const qu = new Proxy(new URLSearchParams(sdir), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  const b_ = (await fetchjson('/api/k')).b_.slice(39)
  const menu = await fetchjson('/api/menu.json')

  console.log(b_);

  updatevaluejstr('b_', b_)
  updatevaluejstr('menu', menu)
  
  console.log(hbsc({b_}));

  updateih('main', hbsc({b_ }))
}

(async()=>{await initialise()})()