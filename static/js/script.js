/* ── NAV MOBILE SEARCH ── */
(function(){
  var inp=document.getElementById('navMobSearchInput');
  if(!inp)return;
  inp.addEventListener('keydown',function(e){
    if(e.key==='Enter'&&this.value.trim()){
      window.location.href='/shop/?q='+encodeURIComponent(this.value.trim());
    }
  });
})();

/* ── NAV SCROLL ── */
const mainNav=document.getElementById("mainNav");
const _isHome=window.location.pathname==='/'||window.location.pathname==='/home/';
if(!_isHome){mainNav.classList.add("nav-scrolled");}
window.addEventListener("scroll",()=>{
  if(_isHome){if(window.scrollY>60){mainNav.classList.add("nav-scrolled");}else{mainNav.classList.remove("nav-scrolled");}}
},{passive:true});

/* ── REVEAL + COUNTER ── */
const kRevealEls=document.querySelectorAll(".k-reveal");
const kRevObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("k-visible");kRevObserver.unobserve(e.target);}});},{threshold:0.12});
kRevealEls.forEach(el=>kRevObserver.observe(el));

const counters=document.querySelectorAll("[data-count]");
const counterObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const el=entry.target;
    const target=Number(el.dataset.count);
    const suffix=target===50?"K+":target===100?"%":"+";
    const start=performance.now();
    const duration=1200;
    function tick(now){const progress=Math.min((now-start)/duration,1);const eased=1-Math.pow(1-progress,3);el.textContent=`${Math.round(target*eased)}${suffix}`;if(progress<1)requestAnimationFrame(tick);}
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
},{threshold:0.55});
counters.forEach(counter=>counterObserver.observe(counter));

/* ── CART ── */
let cart=(()=>{try{return JSON.parse(localStorage.getItem('malola_cart'))||[];}catch{return [];}})();
const cartSidebar=document.getElementById("cartSidebar");
const cartOverlay=document.getElementById("cartOverlay");
const cartItemsEl=document.getElementById("cartItems");
const cartEmptyEl=document.getElementById("cartEmpty");
const cartFooterEl=document.getElementById("cartFooter");
const cartTotalEl=document.getElementById("cartTotal");
const cartBadge=document.getElementById("cartBadge");

function openCart(){cartSidebar.classList.add("open");cartOverlay.classList.add("open");document.body.style.overflow="hidden";refreshCartPrices();}

/* Re-fetch live prices when the cart opens so a stale localStorage price can't
   silently differ at checkout. (Homepage items are base-weight; ratio=1.) */
let _priceRefreshAt=0;
function refreshCartPrices(){
  if(!cart.length)return;
  if(Date.now()-_priceRefreshAt<15000)return;
  _priceRefreshAt=Date.now();
  fetch('/api/products/').then(r=>r.json()).then(d=>{
    const map={};(d.products||[]).forEach(p=>{map[p.id]={price:p.price,mrp:p.mrp};});
    let changed=false;
    cart.forEach(it=>{
      if(!it.slug||!map[it.slug])return;
      const r=it.ratio||1;
      const np=Math.round(map[it.slug].price*r);
      const nm=map[it.slug].mrp?Math.round(map[it.slug].mrp*r):null;
      if(np!==it.price){it.price=np;changed=true;}
      it.mrp=nm;
    });
    if(changed){renderCart();showToast('<i class="fa-solid fa-tag"></i> Some prices were updated to the latest.',3500,'warn');}
  }).catch(()=>{});
}
function closeCart(){cartSidebar.classList.remove("open");cartOverlay.classList.remove("open");document.body.style.overflow="";}
document.getElementById("navCartBtn").addEventListener("click",openCart);
document.getElementById("cartClose").addEventListener("click",closeCart);
cartOverlay.addEventListener("click",closeCart);

let cartCoupon={code:'',discount:0};

function addToCart(name,price,image,slug,mrp,weight,ratio){
  const w=weight||'';
  const existing=cart.find(i=>(i.slug&&i.slug===slug&&(i.weight||'')===w)||(!slug&&i.name===name));
  if(existing){existing.qty+=1;}
  else{cart.push({name,price:parseFloat(price),image,slug:slug||'',mrp:mrp?parseFloat(mrp):null,weight:w,ratio:ratio||1,qty:1});}
  renderCart();
  showToast(`<i class="fa-solid fa-circle-check"></i> ${name} added to cart`);
}

function renderCart(){
  try{localStorage.setItem('malola_cart',JSON.stringify(cart));}catch{}
  const count=cart.reduce((s,i)=>s+i.qty,0);
  if(count>0){cartBadge.style.display="flex";cartBadge.textContent=count>99?"99+":count;}else{cartBadge.style.display="none";}
  const countBadge=document.getElementById('cartCountBadge');
  if(countBadge)countBadge.textContent=count>0?`(${count} item${count!==1?'s':''})`: '';
  const cartBottom=document.getElementById('cartBottom');
  cartItemsEl.innerHTML="";
  if(cart.length===0){
    cartItemsEl.appendChild(cartEmptyEl);cartEmptyEl.style.display="block";
    if(cartBottom)cartBottom.style.display="none";
    cartCoupon={code:'',discount:0};
    const inp=document.getElementById('cartCouponInput');const msg=document.getElementById('cartCouponMsg');
    if(inp)inp.value='';if(msg){msg.style.display='none';msg.textContent='';}
    return;
  }
  cartEmptyEl.style.display="none";
  if(cartBottom)cartBottom.style.display="block";
  let subtotal=0,mrpTotal=0;
  cart.forEach(item=>{subtotal+=item.price*item.qty;mrpTotal+=(item.mrp&&item.mrp>item.price?item.mrp:item.price)*item.qty;});
  cart.forEach((item,idx)=>{
    const row=document.createElement("div");row.className="cart-item";
    const hasMrp=item.mrp&&parseFloat(item.mrp)>item.price;
    const pct=hasMrp?Math.round((parseFloat(item.mrp)-item.price)/parseFloat(item.mrp)*100):0;
    row.innerHTML=`<img class="cart-item-img" src="${item.image}" alt="${item.name}">
      <div class="cart-item-body">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-prices">
          ${hasMrp?`<span class="cart-item-mrp">&#8377;${parseFloat(item.mrp).toFixed(2)}</span>`:''}
          <span class="cart-item-price">&#8377;${item.price.toFixed(2)}</span>
          ${pct>0?`<span class="cart-item-off">(${pct}% OFF)</span>`:''}
        </div>
        <div class="cart-item-actions">
          <div class="cart-qty">
            <button class="qty-btn" data-idx="${idx}" data-action="dec">&#8722;</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" data-idx="${idx}" data-action="inc">&#43;</button>
          </div>
          <button class="cart-item-remove" data-idx="${idx}" aria-label="Remove"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </div>`;
    cartItemsEl.appendChild(row);
  });
  cartItemsEl.querySelectorAll(".qty-btn").forEach(btn=>{btn.addEventListener("click",()=>{const idx=+btn.dataset.idx;if(btn.dataset.action==="inc"){cart[idx].qty+=1;}else{cart[idx].qty-=1;if(cart[idx].qty<=0)cart.splice(idx,1);}renderCart();});});
  cartItemsEl.querySelectorAll(".cart-item-remove").forEach(btn=>{btn.addEventListener("click",()=>{const idx=+btn.dataset.idx;cart.splice(idx,1);renderCart();});});
  const finalTotal=Math.max(0,subtotal-cartCoupon.discount);
  const totalSavings=(mrpTotal-subtotal)+cartCoupon.discount;
  const savingsBar=document.getElementById('cartSavingsBar');
  const savingsText=document.getElementById('cartSavingsText');
  if(savingsBar&&savingsText){
    if(totalSavings>0){savingsBar.style.display='flex';savingsText.textContent=` ₹${totalSavings.toFixed(0)} Saved so far!`;}
    else{savingsBar.style.display='none';}
  }
  if(cartTotalEl)cartTotalEl.innerHTML=`&#8377;${finalTotal.toFixed(0)}`;
  const mrpEl=document.getElementById('cartTotalMrp');
  const pctEl=document.getElementById('cartTotalPct');
  if(mrpEl){
    if(mrpTotal>subtotal||cartCoupon.discount>0){mrpEl.textContent=`₹${mrpTotal.toFixed(0)}`;mrpEl.style.display='inline';}
    else{mrpEl.style.display='none';}
  }
  if(pctEl){
    const tp=mrpTotal>0?Math.round((mrpTotal-finalTotal)/mrpTotal*100):0;
    if(tp>0){pctEl.textContent=`(${tp}% OFF)`;pctEl.style.display='inline';}else{pctEl.style.display='none';}
  }
}
renderCart();

/* ══ CART COUPON ══ */
document.addEventListener('click',e=>{
  if(!e.target.closest('#cartCouponApply'))return;
  const inp=document.getElementById('cartCouponInput');
  const msg=document.getElementById('cartCouponMsg');
  const code=(inp?.value||'').trim().toUpperCase();
  if(!code){if(msg){msg.textContent='Please enter a coupon code.';msg.className='cart-coupon-msg error';msg.style.display='block';}return;}
  const subtotal=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const btn=document.getElementById('cartCouponApply');
  if(btn){btn.disabled=true;btn.textContent='...';}
  fetch('/api/apply-coupon/',{method:'POST',headers:{'Content-Type':'application/json','X-CSRFToken':getCSRF()},body:JSON.stringify({code,cart_total:subtotal})})
    .then(r=>r.json()).then(d=>{
      if(msg){
        if(d.valid){cartCoupon={code,discount:d.discount_amount};msg.textContent=`✔ ₹${d.discount_amount} off applied!`;msg.className='cart-coupon-msg success';}
        else{cartCoupon={code:'',discount:0};msg.textContent=d.error||'Invalid coupon';msg.className='cart-coupon-msg error';}
        msg.style.display='block';
      }
      renderCart();
    }).catch(()=>{if(msg){msg.textContent='Could not apply coupon.';msg.className='cart-coupon-msg error';msg.style.display='block';}})
    .finally(()=>{if(btn){btn.disabled=false;btn.textContent='APPLY';}});
});

document.addEventListener("click",e=>{
  const btn=e.target.closest(".add-to-cart-btn");
  if(btn){
    if(btn.disabled)return;
    btn.disabled=true;
    const orig=btn.innerHTML;
    btn.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>';
    addToCart(btn.dataset.name,btn.dataset.price,btn.dataset.image,btn.dataset.slug||'',btn.dataset.mrp||null);
    openCart();
    setTimeout(()=>{btn.disabled=false;btn.innerHTML=orig;},800);
  }
});

const heroAddCartBtn=document.getElementById("heroAddCart");
if(heroAddCartBtn){
  heroAddCartBtn.addEventListener("click",()=>{addToCart(heroAddCartBtn.dataset.name,heroAddCartBtn.dataset.price,heroAddCartBtn.dataset.image,heroAddCartBtn.dataset.slug||'',heroAddCartBtn.dataset.mrp||null);openCart();});
}

/* ── AUTH ── */
function getCSRF(){return document.querySelector('meta[name="csrf-token"]')?.content||'';}
let pendingCheckout=false;

const authModal=document.getElementById("authModal");
const authOverlay=document.getElementById("authOverlay");
function openAuth(tab){authModal.classList.add("open");authOverlay.classList.add("open");document.body.style.overflow="hidden";if(tab)switchAuthTab(tab);}
function closeAuth(){authModal.classList.remove("open");authOverlay.classList.remove("open");document.body.style.overflow="";}
function switchAuthTab(tab){document.querySelectorAll(".auth-tab").forEach(t=>t.classList.toggle("active",t.dataset.tab===tab));document.getElementById("loginForm").style.display=tab==="login"?"block":"none";document.getElementById("registerForm").style.display=tab==="register"?"block":"none";}
const navLoginBtn=document.getElementById("navLoginBtn");
const navSignupBtn=document.getElementById("navSignupBtn");
if(navLoginBtn)navLoginBtn.addEventListener("click",()=>openAuth("login"));
if(navSignupBtn)navSignupBtn.addEventListener("click",()=>openAuth("register"));

/* Profile dropdown (server-rendered logged-in state) */
(function(){
  const wrap=document.getElementById("navProfileWrap");
  if(!wrap)return;
  const btn=document.getElementById("navProfileBtn");
  const logoutBtn=document.getElementById("navLogoutBtn");
  btn.addEventListener("click",e=>{e.stopPropagation();wrap.classList.toggle("open");});
  document.addEventListener("click",()=>wrap.classList.remove("open"));
  wrap.querySelector(".nav-profile-drop").addEventListener("click",e=>e.stopPropagation());
  if(logoutBtn)logoutBtn.addEventListener("click",async()=>{
    await fetch("/api/logout/",{method:"POST",headers:{"X-CSRFToken":getCSRF()}});
    window.location.reload();
  });
})();
document.getElementById("authClose").addEventListener("click",closeAuth);
authOverlay.addEventListener("click",closeAuth);
document.querySelectorAll(".auth-tab").forEach(tab=>{tab.addEventListener("click",()=>switchAuthTab(tab.dataset.tab));});
document.querySelectorAll(".switch-link").forEach(link=>{link.addEventListener("click",e=>{e.preventDefault();switchAuthTab(link.dataset.switch);});});

function updateNavAfterLogin(name){
  const loginBtn=document.getElementById("navLoginBtn");
  const signupBtn=document.getElementById("navSignupBtn");
  if(loginBtn)loginBtn.style.display="none";
  if(signupBtn)signupBtn.style.display="none";
  if(!document.getElementById("navProfileWrap")){
    const navActions=document.querySelector(".nav-actions");
    if(navActions){
      const initial=name.charAt(0).toUpperCase();
      const first=name.split(" ")[0];
      const wrap=document.createElement("div");
      wrap.id="navProfileWrap";wrap.className="nav-profile-wrap";
      wrap.innerHTML=`<button class="nav-profile-btn" id="navProfileBtn"><span class="nav-profile-avatar">${initial}</span><span class="nav-profile-name">${first}</span><i class="fa-solid fa-chevron-down nav-profile-caret"></i></button><div class="nav-profile-drop"><div class="npd-header"><div class="npd-avatar-lg">${initial}</div><div class="npd-info"><div class="npd-name">${name}</div></div></div><div class="npd-divider"></div><a href="/orders/" class="npd-item"><i class="fa-solid fa-bag-shopping"></i> My Orders</a><div class="npd-divider"></div><button class="npd-item npd-logout" id="_dynLogout"><i class="fa-solid fa-right-from-bracket"></i> Logout</button></div>`;
      const ham=document.getElementById("navHamburger");
      if(ham)navActions.insertBefore(wrap,ham);else navActions.appendChild(wrap);
      document.getElementById("navProfileBtn").addEventListener("click",e=>{e.stopPropagation();wrap.classList.toggle("open");});
      wrap.querySelector(".nav-profile-drop").addEventListener("click",e=>e.stopPropagation());
      document.addEventListener("click",()=>wrap.classList.remove("open"));
      document.getElementById("_dynLogout").addEventListener("click",async()=>{
        await fetch("/api/logout/",{method:"POST",headers:{"X-CSRFToken":getCSRF()}});
        window.location.reload();
      });
    }
  }
  const mobLogin=document.getElementById("mobLoginBtn");
  const mobSignup=document.getElementById("mobSignupBtn");
  if(mobLogin)mobLogin.style.display="none";
  if(mobSignup)mobSignup.style.display="none";
}

function onAuthSuccess(name){
  window.MALOLA_AUTH={authenticated:true,name};
  updateNavAfterLogin(name);
  closeAuth();
  showToast(`<i class="fa-solid fa-circle-check"></i> Welcome, ${name.split(" ")[0]}! 🎉`);
  if(pendingCheckout){pendingCheckout=false;setTimeout(buildCheckoutModal,300);}
}

async function submitAuth(url,payload,btn,errEl){
  const orig=btn.innerHTML;btn.disabled=true;btn.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>';errEl.textContent="";
  try{
    const r=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":getCSRF()},body:JSON.stringify(payload)});
    const d=await r.json();
    if(d.success){onAuthSuccess(d.name);}else{errEl.textContent=d.error||"Something went wrong";}
  }catch(err){errEl.textContent="Connection error. Try again.";}
  btn.disabled=false;btn.innerHTML=orig;
}

(function(){
  const lf=document.getElementById("loginForm");
  const le=Object.assign(document.createElement("p"),{style:"color:#c62828;font-size:.8rem;font-weight:700;margin:8px 0 0;text-align:center;min-height:18px"});
  lf.appendChild(le);
  lf.addEventListener("submit",e=>{
    e.preventDefault();
    const email=lf.querySelector('input[type="email"]').value.trim();
    const password=lf.querySelector('input[type="password"]').value;
    if(!email){le.textContent="Please enter your email address";return;}
    if(!password){le.textContent="Please enter your password";return;}
    submitAuth("/api/login/",{email,password},lf.querySelector(".auth-submit"),le);
  });

  const rf=document.getElementById("registerForm");
  const re=Object.assign(document.createElement("p"),{style:"color:#c62828;font-size:.8rem;font-weight:700;margin:8px 0 0;text-align:center;min-height:18px"});
  rf.appendChild(re);
  rf.addEventListener("submit",e=>{
    e.preventDefault();
    const inputs=rf.querySelectorAll("input");
    const name=inputs[0].value.trim();
    const email=inputs[1].value.trim();
    const password=inputs[2].value;
    if(!name){re.textContent="Please enter your full name";return;}
    if(!email){re.textContent="Please enter your email address";return;}
    if(!password||password.length<6){re.textContent="Password must be at least 6 characters";return;}
    submitAuth("/api/register/",{name,email,password},rf.querySelector(".auth-submit"),re);
  });
})();

/* ── CHECKOUT ── */
const _esc=s=>(s||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function _coField(id,value,placeholder,type='text',maxlength=''){
  return `<div class="co-field"><input class="co-input" type="${type}" id="${id}" value="${_esc(value)}" placeholder="${placeholder}" autocomplete="off"${maxlength?` maxlength="${maxlength}"`:''}><div class="co-field-err" id="${id}Err"></div></div>`;
}
function _setFieldErr(id,msg){
  const inp=document.getElementById(id);const err=document.getElementById(id+'Err');
  if(!inp)return;
  if(msg){inp.classList.add('co-err');if(err){err.textContent=msg;err.classList.add('show');}}
  else{inp.classList.remove('co-err');if(err)err.classList.remove('show');}
}
function _coFormatAddress(addr1,area,city,pincode,state,landmark){
  const parts=[addr1,area];if(landmark)parts.push('Landmark: '+landmark);
  parts.push(`${city} - ${pincode}, ${state}`);return parts.filter(Boolean).join('\n');
}
function _coMajority(arr){
  const counts={};let best='',bestN=0;
  arr.filter(Boolean).forEach(v=>{counts[v]=(counts[v]||0)+1;if(counts[v]>bestN){bestN=counts[v];best=v;}});
  return best;
}
function _coBindPincode(){
  const pin=document.getElementById('coPincode');
  if(pin){
    pin.addEventListener('input',()=>{
      const v=pin.value.replace(/\D/g,'').slice(0,6);
      if(pin.value!==v)pin.value=v;
      if(v.length===6)_coLookupPincode(v);
    });
  }
  const phone=document.getElementById('coPhone');
  if(phone){
    phone.addEventListener('input',()=>{
      const v=phone.value.replace(/\D/g,'').slice(0,10);
      if(phone.value!==v)phone.value=v;
    });
    phone.addEventListener('keypress',e=>{if(!/[0-9]/.test(e.key))e.preventDefault();});
  }
}
async function _coLookupPincode(pincode){
  const stateEl=document.getElementById('coState');
  const cityEl=document.getElementById('coCity');
  const errEl=document.getElementById('coPincodeErr');
  const suggEl=document.getElementById('coAreaSuggest');
  _setFieldErr('coPincode','');
  if(suggEl)suggEl.innerHTML='';
  if(errEl){errEl.textContent='Looking up…';errEl.style.color='#1976D2';errEl.classList.add('show');}
  try{
    const r=await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    const d=await r.json();
    const rec=d&&d[0];
    if(rec&&rec.Status==='Success'&&rec.PostOffice&&rec.PostOffice.length){
      const district=_coMajority(rec.PostOffice.map(po=>po.District));
      const state=_coMajority(rec.PostOffice.map(po=>po.State));
      if(stateEl){stateEl.value=state||stateEl.value;stateEl.classList.remove('co-err');}
      if(cityEl){cityEl.value=district||cityEl.value;cityEl.classList.remove('co-err');}
      if(errEl){errEl.classList.remove('show');errEl.style.color='';}
      _coRenderAreaSuggest(rec.PostOffice);
    }else if(errEl){errEl.style.color='';errEl.classList.remove('show');}
  }catch{if(errEl){errEl.style.color='';errEl.classList.remove('show');}}
}
function _coRenderAreaSuggest(postOffices){
  const suggEl=document.getElementById('coAreaSuggest');
  const areaEl=document.getElementById('coArea');
  if(!suggEl||!areaEl)return;
  const names=[...new Set(postOffices.map(po=>po.Name).filter(Boolean))];
  if(!names.length){suggEl.innerHTML='';areaEl.removeAttribute('list');return;}
  suggEl.innerHTML=`<datalist id="coAreaList">${names.map(n=>`<option value="${_esc(n)}">`).join('')}</datalist>
    <div class="co-area-hint"><i class="fa-solid fa-circle-info"></i> ${names.length} ${names.length===1?'locality':'localities'} found — type or pick from the list above.</div>`;
  areaEl.setAttribute('list','coAreaList');
  areaEl.setAttribute('placeholder','Type or choose your area *');
}
function buildCheckoutModal(){
  const existing=document.getElementById('checkoutModal');if(existing)existing.remove();
  if(cart.length===0){showToast('<i class="fa-solid fa-basket-shopping"></i> Your cart is empty!');return;}
  const subtotal=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const total=Math.max(0,subtotal-cartCoupon.discount);
  const itemsHtml=cart.map(i=>`<div class="co-item-row"><span class="co-item-name">${_esc(i.name)} <span>×${i.qty}</span></span><span class="co-item-price">&#8377;${(i.price*i.qty).toFixed(0)}</span></div>`).join('');
  const modal=document.createElement('div');modal.id='checkoutModal';modal.className='co-overlay';
  modal.innerHTML=`<div class="co-card">
    <div class="co-head">
      <h2 class="co-title"><i class="fa-solid fa-basket-shopping"></i>Your Order</h2>
      <button id="coClose" class="co-close-btn">&times;</button>
    </div>
    <div class="co-items">${itemsHtml}</div>
    <div class="co-divider"></div>
    <div class="co-total-row">
      <span class="co-total-label">Total</span>
      <span class="co-total-val">&#8377;${total.toFixed(0)}</span>
    </div>
    <form id="coForm" novalidate>
      <div class="co-sec-head"><i class="fa-solid fa-user"></i> Contact Information</div>
      <div class="co-row2">
        ${_coField('coName','','Full Name *')}
        ${_coField('coPhone','','Mobile Number *','tel','10')}
      </div>
      <div class="co-sec-head"><i class="fa-solid fa-location-dot"></i> Delivery Address</div>
      <div class="co-row2">
        ${_coField('coPincode','','Pincode *','text','6')}
        ${_coField('coState','','State *')}
      </div>
      ${_coField('coAddr1','','House/Flat No., Building, Society *')}
      ${_coField('coArea','','Area / Colony / Street / Sector *')}
      <div id="coAreaSuggest" class="co-area-suggest"></div>
      <div class="co-row2">
        ${_coField('coCity','','City / District *')}
        ${_coField('coLandmark','','Landmark (optional)')}
      </div>
      <button type="submit" id="coSubmit" class="co-submit" style="margin-top:8px">
        Place My Order &nbsp;<i class="fa-solid fa-arrow-right"></i>
      </button>
    </form>
  </div>`;
  document.body.appendChild(modal);document.body.style.overflow='hidden';
  document.getElementById('coClose').addEventListener('click',closeCheckoutModal);
  modal.addEventListener('click',e=>{if(e.target===modal)closeCheckoutModal();});
  _coBindPincode();
  document.getElementById('coForm').addEventListener('submit',async e=>{
    e.preventDefault();
    document.querySelectorAll('#coForm .co-input').forEach(i=>i.classList.remove('co-err'));
    document.querySelectorAll('#coForm .co-field-err').forEach(e=>e.classList.remove('show'));
    const name   =document.getElementById('coName').value.trim();
    const phone  =document.getElementById('coPhone').value.trim();
    const pincode=document.getElementById('coPincode').value.trim();
    const state  =document.getElementById('coState').value.trim();
    const addr1  =document.getElementById('coAddr1').value.trim();
    const area   =document.getElementById('coArea').value.trim();
    const city   =document.getElementById('coCity').value.trim();
    const landmark=document.getElementById('coLandmark').value.trim();
    let ok=true;
    if(!name){_setFieldErr('coName','Please enter your full name.');ok=false;}
    if(!/^[6-9][0-9]{9}$/.test(phone)){_setFieldErr('coPhone','Enter a valid 10-digit mobile number.');ok=false;}
    if(!/^[0-9]{6}$/.test(pincode)){_setFieldErr('coPincode','Enter a valid 6-digit pincode.');ok=false;}
    if(!state){_setFieldErr('coState','Please enter your state.');ok=false;}
    if(!addr1){_setFieldErr('coAddr1','Please enter house/flat and building.');ok=false;}
    if(!area){_setFieldErr('coArea','Please enter area/street.');ok=false;}
    if(!city){_setFieldErr('coCity','Please enter your city/district.');ok=false;}
    if(!ok){document.querySelector('#coForm .co-err')?.scrollIntoView({behavior:'smooth',block:'nearest'});return;}
    const address=_coFormatAddress(addr1,area,city,pincode,state,landmark);
    const btn=document.getElementById('coSubmit');
    btn.disabled=true;btn.innerHTML='Placing Order… <i class="fa-solid fa-spinner fa-spin"></i>';
    const coTotal=cart.reduce((s,i)=>s+i.price*i.qty,0);
    const payload={name,phone,address,items:cart.map(i=>({name:i.name,slug:i.slug,qty:i.qty,image:i.image,weight:i.weight||''})),total:coTotal,coupon_code:cartCoupon.code||''};
    try{
      const resp=await fetch('/api/place-order/',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
      const data=await resp.json();
      if(data.success){
        if(data.price_changed){showToast('<i class="fa-solid fa-tag"></i> Prices updated — your total is now ₹'+Math.round(data.server_total)+'.',4000,'warn');}
        cart=[];cartCoupon={code:'',discount:0};renderCart();closeCart();closeCheckoutModal();
        setTimeout(()=>{window.location.href=data.redirect;}, data.price_changed?1200:0);
        return;
      }
      btn.disabled=false;btn.innerHTML='Place My Order &nbsp;<i class="fa-solid fa-arrow-right"></i>';
      showOrderError(data);
    }catch(err){
      btn.disabled=false;btn.innerHTML='Place My Order &nbsp;<i class="fa-solid fa-arrow-right"></i>';
      showToast('<i class="fa-solid fa-wifi"></i> Network error — please check your connection and try again.',3500,'error');
    }
  });
}
function closeCheckoutModal(){const m=document.getElementById('checkoutModal');if(m)m.remove();document.body.style.overflow='';}
document.addEventListener('click',e=>{
  if(!e.target.closest('.checkout-btn'))return;
  if(!window.MALOLA_AUTH||!window.MALOLA_AUTH.authenticated){
    pendingCheckout=true;
    openAuth('login');
    showToast('<i class="fa-solid fa-lock"></i> Please login to place your order',3000);
    return;
  }
  buildCheckoutModal();
});

/* ── TOAST ── */
function showToast(html,duration=3000,type=''){
  const container=document.getElementById("toastContainer");
  const t=document.createElement("div");t.className="toast"+(type?" toast--"+type:"");t.innerHTML=html;
  container.appendChild(t);
  requestAnimationFrame(()=>requestAnimationFrame(()=>t.classList.add("show")));
  setTimeout(()=>{t.classList.remove("show");setTimeout(()=>t.remove(),420);},duration);
}

/* Map a place-order error response to an icon + toast colour */
function showOrderError(data){
  const map={
    out_of_stock:       {icon:'fa-ban',                  type:'error'},
    insufficient_stock: {icon:'fa-layer-group',          type:'warn'},
    max_qty_reached:    {icon:'fa-circle-exclamation',   type:'warn'},
    product_unavailable:{icon:'fa-triangle-exclamation', type:'error'},
    invalid_input:      {icon:'fa-circle-xmark',         type:'error'},
  };
  const m=map[data&&data.code]||{icon:'fa-circle-exclamation',type:'error'};
  showToast('<i class="fa-solid '+m.icon+'"></i> '+((data&&data.error)||'Something went wrong. Please try again.'),3800,m.type);
}

/* ── HAMBURGER MOBILE MENU ── */
(function(){
  const ham = document.getElementById('navHamburger');
  const mob = document.getElementById('mobMenu');
  const overlay = document.getElementById('mobMenuOverlay');
  const close = document.getElementById('mobMenuClose');
  function openMob(){mob.classList.add('open');overlay.classList.add('open');ham.classList.add('open');document.body.style.overflow='hidden';}
  function closeMob(){mob.classList.remove('open');overlay.classList.remove('open');ham.classList.remove('open');document.body.style.overflow='';}
  ham.addEventListener('click', openMob);
  close.addEventListener('click', closeMob);
  overlay.addEventListener('click', closeMob);
  const mobLoginBtn=document.getElementById('mobLoginBtn');
  const mobSignupBtn=document.getElementById('mobSignupBtn');
  const mobLogoutBtn=document.getElementById('mobLogoutBtn');
  if(mobLoginBtn)mobLoginBtn.addEventListener('click',()=>{closeMob();openAuth('login');});
  if(mobSignupBtn)mobSignupBtn.addEventListener('click',()=>{closeMob();openAuth('register');});
  if(mobLogoutBtn)mobLogoutBtn.addEventListener('click',async()=>{await fetch('/api/logout/',{method:'POST',headers:{'X-CSRFToken':getCSRF()}});window.location.reload();});
  document.querySelectorAll('.mob-prod-item[data-pdp]').forEach(item=>{
    item.addEventListener('click',()=>{window.location.href='/product/?id='+item.dataset.pdp;});
  });
  document.querySelectorAll('.mob-nav-links a').forEach(a=>{a.addEventListener('click',closeMob);});
})();

/* ── SEARCH WIDGET ── */
(function(){
  const modal     = document.getElementById('searchModal');
  const overlay   = document.getElementById('searchOverlay');
  const smInput   = document.getElementById('smInput');
  const smClear   = document.getElementById('smClear');
  const smBack    = document.getElementById('smBack');
  const smBody    = document.getElementById('smBody');
  const smResults = document.getElementById('smResults');

  let catalog = [];
  fetch('/api/products/').then(r=>r.json()).then(d=>{catalog=d.products||[];}).catch(()=>{});

  function openWidget() {
    modal.classList.add('open');
    overlay.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    setTimeout(() => smInput.focus(), 150);
  }
  function closeWidget() {
    modal.classList.remove('open');
    overlay.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    smInput.value = '';
    smClear.classList.remove('visible');
    smBody.classList.remove('hidden');
    smResults.classList.remove('active');
    smResults.innerHTML = '';
  }

  const navSearchBtn = document.getElementById('navSearchBtn');
  if (navSearchBtn) navSearchBtn.addEventListener('click', e => { e.stopPropagation(); openWidget(); });
  const mobSearchInput = document.getElementById('mobSearchInput');
  if (mobSearchInput) mobSearchInput.addEventListener('focus', openWidget);
  const topbarSearchBtn = document.getElementById('topbarSearchBtn');
  if (topbarSearchBtn) topbarSearchBtn.addEventListener('click', openWidget);

  smBack.addEventListener('click', closeWidget);
  overlay.addEventListener('click', closeWidget);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeWidget(); });

  document.querySelectorAll('.sm-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      smInput.value = tag.dataset.q;
      smClear.classList.add('visible');
      doSearch(tag.dataset.q);
    });
  });

  smInput.addEventListener('input', () => {
    const q = smInput.value.trim();
    smClear.classList.toggle('visible', q.length > 0);
    doSearch(q);
  });

  smClear.addEventListener('click', () => {
    smInput.value = '';
    smClear.classList.remove('visible');
    smBody.classList.remove('hidden');
    smResults.classList.remove('active');
    smResults.innerHTML = '';
    smInput.focus();
  });

  function doSearch(q) {
    if (!q) {
      smBody.classList.remove('hidden');
      smResults.classList.remove('active');
      smResults.innerHTML = '';
      return;
    }
    smBody.classList.add('hidden');
    smResults.classList.add('active');
    const matches = catalog.filter(p =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.cat.toLowerCase().includes(q.toLowerCase())
    );
    if (matches.length === 0) {
      smResults.innerHTML = `<div class="sm-no-result"><i class="fa-solid fa-magnifying-glass"></i><p>No results for "${q}"</p><span>Try Millet, Puffs or Pancake</span></div>`;
    } else {
      smResults.innerHTML = `<div class="sm-res-label">${matches.length} result${matches.length>1?'s':''} found</div>` +
        matches.map(p => `
          <div class="sm-res-item" onclick="window.location.href='/product/?id=${p.id}'">
            <img src="${p.img}" alt="${p.name}" class="sm-res-img">
            <div class="sm-res-info">
              <div class="sm-res-name">${p.name}</div>
              <div class="sm-res-cat">${p.cat} · 100g</div>
              <div class="sm-res-price">₹${p.price}</div>
            </div>
            <button class="sm-res-add add-to-cart-btn" data-name="${p.name}" data-price="${p.price}" data-image="${p.img}" data-slug="${p.id}" data-mrp="${p.mrp||''}" onclick="event.stopPropagation()">ADD</button>
          </div>`
        ).join('');
    }
  }
})();

/* ── PRODUCT PAGE NAVIGATION ── */
(function(){
  /* mega menu items → navigate to product page */
  document.querySelectorAll('.mega-item[data-pdp]').forEach(item => {
    item.addEventListener('click', () => {
      window.location.href = '/product/?id=' + item.dataset.pdp;
    });
  });

  /* product cards on page → navigate to product page */
  const nameMap = {
    'Millet Vanilla':'milletvanilla','Millet Choco':'milletchoco',
    'Blueberry Pancake':'blueberrypancake','Quinoa Puffs':'quinoapuffs',
  };
  document.querySelectorAll('.k-prod-card').forEach(card => {
    const nameEl = card.querySelector('.k-prod-name');
    if (!nameEl) return;
    const pid = nameMap[nameEl.textContent.trim()];
    if (!pid) return;
    card.addEventListener('click', e => {
      if (e.target.closest('.add-to-cart-btn')) return;
      window.location.href = '/product/?id=' + pid;
    });
  });
})();

/* ── REEL THUMBNAILS: lazy-load videos when section enters viewport (legacy) ── */
(function(){
  const grid = document.getElementById('reelsGrid');
  if (!grid) return;
  let loaded = false;
  const loadReelVideos = () => {
    if (loaded) return;
    loaded = true;
    grid.querySelectorAll('.reel-thumb').forEach(thumb => {
      const vid = thumb.querySelector('.reel-thumb-vid');
      if (vid && !vid.src && thumb.dataset.src) {
        vid.src = thumb.dataset.src;
        vid.play().catch(() => {});
      }
    });
  };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { loadReelVideos(); io.disconnect(); }
    }, { threshold: 0.1 });
    io.observe(grid);
  } else {
    loadReelVideos();
  }
})();

/* ── REELS: thumbnail grid → story-viewer modal on click ── */
(function(){
  const modal    = document.getElementById('reelModal');
  if (!modal) return;
  const thumbs   = Array.from(document.querySelectorAll('.reel-thumb'));
  if (!thumbs.length) return;

  const centerVid  = document.getElementById('reelModalVideo');
  const muteBtn    = document.getElementById('reelModalMute');
  const closeBtn   = document.getElementById('reelModalClose');
  const prevBtn    = document.getElementById('reelModalPrev');
  const nextBtn    = document.getElementById('reelModalNext');
  const peekLeft   = document.getElementById('reelModalPeekLeft');
  const peekRight  = document.getElementById('reelModalPeekRight');
  const titleEl    = document.getElementById('reelModalTitle');
  const dotsWrap   = document.getElementById('reelModalDots');

  const vids = thumbs.map(t => ({ src: t.dataset.src || '', title: t.dataset.title || '' }));
  let current = 0;
  let muted = true;

  /* build dots */
  vids.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'reel-modal-dot';
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
  });
  const dots = Array.from(dotsWrap.children);

  function goTo(idx) {
    current = Math.max(0, Math.min(vids.length - 1, idx));
    const c = vids[current];

    /* center video */
    if (centerVid.getAttribute('src') !== c.src) centerVid.src = c.src;
    centerVid.muted = muted;
    centerVid.play().catch(() => {});
    titleEl.textContent = c.title;

    /* left peek */
    const lData = vids[current - 1];
    const lv = peekLeft.querySelector('video');
    if (lData) {
      if (lv.getAttribute('src') !== lData.src) lv.src = lData.src;
      lv.play().catch(() => {});
      peekLeft.classList.remove('reel-peek-hidden');
    } else {
      lv.pause(); lv.removeAttribute('src');
      peekLeft.classList.add('reel-peek-hidden');
    }

    /* right peek */
    const rData = vids[current + 1];
    const rv = peekRight.querySelector('video');
    if (rData) {
      if (rv.getAttribute('src') !== rData.src) rv.src = rData.src;
      rv.play().catch(() => {});
      peekRight.classList.remove('reel-peek-hidden');
    } else {
      rv.pause(); rv.removeAttribute('src');
      peekRight.classList.add('reel-peek-hidden');
    }

    prevBtn.disabled = current <= 0;
    nextBtn.disabled = current >= vids.length - 1;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function openModal(idx) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    goTo(idx);
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    centerVid.pause(); centerVid.removeAttribute('src');
    peekLeft.querySelector('video').pause();
    peekRight.querySelector('video').pause();
  }

  thumbs.forEach((t, i) => t.addEventListener('click', () => openModal(i)));
  peekLeft.addEventListener('click',  () => goTo(current - 1));
  peekRight.addEventListener('click', () => goTo(current + 1));
  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  muteBtn.addEventListener('click', () => {
    muted = !muted;
    centerVid.muted = muted;
    muteBtn.querySelector('i').className = muted
      ? 'fa-solid fa-volume-xmark'
      : 'fa-solid fa-volume-high';
  });

  document.addEventListener('keydown', e => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'ArrowLeft')  goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
    if (e.key === 'Escape')     closeModal();
  });

  let tx = 0;
  modal.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, {passive:true});
  modal.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) < 40) return;
    goTo(dx < 0 ? current + 1 : current - 1);
  }, {passive:true});
})();

/* ── PAGE LOAD PROGRESS BAR ── */
(function(){
  const bar=document.createElement('div');
  bar.id='npBar';
  bar.style.cssText='position:fixed;top:0;left:0;width:0;height:3px;background:#FECF0A;z-index:99999;transition:width .3s ease,opacity .4s ease;pointer-events:none;';
  document.body.appendChild(bar);
  let _t=null;
  function start(){
    clearTimeout(_t);
    bar.style.opacity='1';
    bar.style.width='0';
    requestAnimationFrame(()=>{bar.style.transition='width 8s cubic-bezier(.1,0,.3,1),opacity .4s';bar.style.width='85%';});
  }
  function finish(){
    bar.style.transition='width .2s ease,opacity .4s ease';
    bar.style.width='100%';
    _t=setTimeout(()=>{bar.style.opacity='0';setTimeout(()=>{bar.style.width='0';},400);},300);
  }
  window.addEventListener('beforeunload',start);
  window.addEventListener('pageshow',finish);
  // Also show on product card / link clicks (full page navigations)
  document.addEventListener('click',e=>{
    const a=e.target.closest('a[href]');
    if(!a)return;
    const href=a.getAttribute('href')||'';
    if(href.startsWith('#')||href.startsWith('javascript')||a.target==='_blank')return;
    if(href.startsWith('http')&&!href.includes(location.hostname))return;
    start();
  });
})();

/* ── FOOTER FORM ── */
document.getElementById("footerForm")?.addEventListener("submit",e=>{e.preventDefault();showToast('<i class="fa-solid fa-envelope"></i> You\'re subscribed! 🎉');});

/* ── OWL CAROUSEL ── */
$(function(){
  $(".kids-testimonial-carousel").owlCarousel({
    loop:true,margin:24,nav:true,dots:true,
    center:true,autoplay:true,autoplayTimeout:5000,autoplayHoverPause:true,
    navText:["&#8592;","&#8594;"],
    responsive:{0:{items:1},768:{items:2},1200:{items:3}}
  });

});

