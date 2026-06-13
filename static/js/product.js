/* ══ PRODUCT CATALOG ══ */
const productCatalog = {

  /* ── BITES & CRUNCHIES ── */
  milletvanilla:{id:'milletvanilla',name:'Millet Vanilla',category:'Bites & Crunchies',categoryId:'bites',price:199,badge:'Best Seller 🔥',badgeColor:'#4e7a1e',bg:'#edf5e1',image:'/static/images/green.png',imageBack:'/static/images/green.png',description:'Creamy vanilla meets wholesome millet in every delightful bite. A smooth, guilt-free treat packed with fibre and natural goodness — loved by kids and parents alike.',ingredients:['Whole Millet','Natural Vanilla','Jaggery','Rice Flour','No Artificial Colours','Non-GMO'],nutrition:{Calories:'400 kcal',Protein:'7g',Fat:'12g',Carbs:'64g',Fibre:'6g'},weights:['100g','200g','500g']},

  milletchoco:{id:'milletchoco',name:'Millet Choco',category:'Bites & Crunchies',categoryId:'bites',price:199,badge:'Fan Fav ✨',badgeColor:'#5c3e18',bg:'#f5ede6',image:'/static/images/a6bf2fb7-be25-4e5c-94f4-ba9215f70999_removalai_preview.png',imageBack:'/static/images/Choco Bytes Back.png',description:'Rich dark chocolate meets wholesome millet in every crunchy bite. A guilt-free indulgence packed with fibre, iron and natural energy — perfect for everyday snacking.',ingredients:['Whole Millet','Dark Chocolate Coating','Cocoa Powder','Jaggery','No Artificial Colours','Non-GMO'],nutrition:{Calories:'420 kcal',Protein:'8g',Fat:'14g',Carbs:'62g',Fibre:'6g'},weights:['100g','200g','500g']},

  chocobytes:{id:'chocobytes',name:'Choco Bytes',category:'Bites & Crunchies',categoryId:'bites',price:199,badge:'Kids Pick 🍫',badgeColor:'#4a2000',bg:'#fbe8d8',image:'/static/images/Choco Bytes Front.png',imageBack:'/static/images/Choco Bytes Back.png',description:'Bite-sized millet snacks coated in rich chocolate — crunchy, chocolatey, made without junk. A smart swap for chocolate bars that kids will love every single day.',ingredients:['Millet','Cocoa','Jaggery','Rice Flour','Natural Flavour','No Preservatives'],nutrition:{Calories:'415 kcal',Protein:'7g',Fat:'13g',Carbs:'63g',Fibre:'5g'},weights:['100g','200g','500g']},

  chococrunch:{id:'chococrunch',name:'Choco Crunch',category:'Bites & Crunchies',categoryId:'bites',price:199,badge:'Crunchy 🌾',badgeColor:'#3e2000',bg:'#f9e6d0',image:'/static/images/choco crunch front.png',imageBack:'/static/images/choco crunch back.png',description:'Ragi and millet come together in this irresistibly crunchy chocolate snack. Light, airy, packed with calcium — satisfies every crunch craving guilt-free.',ingredients:['Ragi','Millet','Cocoa Powder','Jaggery','Sea Salt','No Artificial Additives'],nutrition:{Calories:'390 kcal',Protein:'9g',Fat:'11g',Carbs:'62g',Fibre:'7g'},weights:['100g','200g','500g']},

  cheddarball:{id:'cheddarball',name:'Cheddar Cheese Balls',category:'Bites & Crunchies',categoryId:'bites',price:199,badge:'Cheesy! 🧀',badgeColor:'#7a4800',bg:'#fff3d0',image:'/static/images/cheddar cheese balls front.png',imageBack:'/static/images/cheddar cheese balls back.png',description:'Puffy, cheesy, millet-based balls with a bold cheddar punch. Baked not fried — each ball delivers real cheese flavour with a wholesome nutritious core.',ingredients:['Millet','Cheddar Cheese','Sea Salt','Sunflower Oil','No MSG','No Artificial Colours'],nutrition:{Calories:'395 kcal',Protein:'9g',Fat:'13g',Carbs:'60g',Fibre:'5g'},weights:['100g','200g','500g']},

  buttermakhana:{id:'buttermakhana',name:'Butter Makhana',category:'Bites & Crunchies',categoryId:'bites',price:249,badge:'Premium 🌟',badgeColor:'#4e3700',bg:'#fef8e7',image:'/static/images/butter makhana front.png',imageBack:'/static/images/butter makhana back.png',description:'Premium lotus seeds roasted in real butter and lightly seasoned. A protein-rich, low-calorie snack that feels indulgent but is completely wholesome — anytime, anywhere.',ingredients:['Lotus Seeds (Makhana)','Butter','Sea Salt','Black Pepper','No Preservatives','Gluten-Free'],nutrition:{Calories:'325 kcal',Protein:'9g',Fat:'10g',Carbs:'50g',Fibre:'4g'},weights:['50g','100g','200g']},

  cheddaropuff:{id:'cheddaropuff',name:'Cheddar Cheese Puffs',category:'Bites & Crunchies',categoryId:'bites',price:199,badge:'Puff Up! 🧀',badgeColor:'#6b4a00',bg:'#fff9e8',image:'/static/images/Puff Cheddar Cheese.png',imageBack:'/static/images/cheese puff back.png',description:'Light-as-air quinoa puffs with bold cheddar cheese seasoning. Each puff melts in your mouth with irresistible cheese goodness — no MSG, no artificial colours.',ingredients:['Quinoa','Cheddar Seasoning','Sea Salt','Sunflower Oil','No MSG','No Artificial Colours'],nutrition:{Calories:'390 kcal',Protein:'10g',Fat:'12g',Carbs:'60g',Fibre:'5g'},weights:['100g','200g','500g']},

  tangipuffs:{id:'tangipuffs',name:'Tangi Tomato Puffs',category:'Bites & Crunchies',categoryId:'bites',price:199,badge:'Tangy! 🍅',badgeColor:'#8b1a00',bg:'#fff0ee',image:'/static/images/Puff Tangi Tomato.png',imageBack:'/static/images/Puff Tangi Tomato (1).png',description:'Zesty tomato meets the crunch of quinoa in these irresistible puffs. Bold, tangy, and full of flavour — the guilt-free answer to your namkeen cravings.',ingredients:['Quinoa','Tomato Powder','Tamarind','Sea Salt','Sunflower Oil','No Artificial Additives'],nutrition:{Calories:'385 kcal',Protein:'9g',Fat:'11g',Carbs:'62g',Fibre:'5g'},weights:['100g','200g','500g']},

  quinoapuffs:{id:'quinoapuffs',name:'Quinoa Puffs',category:'Bites & Crunchies',categoryId:'bites',price:299,badge:'Season 🌾',badgeColor:'#7a3810',bg:'#fdf0e2',image:'/static/images/red.png',imageBack:'/static/images/red.png',description:'Airy, crunchy quinoa puffs seasoned to perfection. Loaded with complete protein and essential amino acids — a smarter snack that kids love and parents trust.',ingredients:['Quinoa','Cheddar Seasoning','Sea Salt','Sunflower Oil','No MSG','Gluten-Free'],nutrition:{Calories:'390 kcal',Protein:'10g',Fat:'12g',Carbs:'60g',Fibre:'5g'},weights:['100g','200g','500g']},

  /* ── CEREALS & GRANOLA ── */
  bananagranola:{id:'bananagranola',name:'Banana Granola',category:'Cereals & Granola',categoryId:'cereals',price:349,badge:'Breakfast 🍌',badgeColor:'#c77700',bg:'#fff8e1',image:'/static/images/Banana Granola.png',imageBack:'/static/images/Banana Granola Back.png',description:'Sun-dried banana slices meet toasted oats, millet, and honey in this vibrant granola. A naturally sweet, energising start to your morning that keeps you going all day.',ingredients:['Rolled Oats','Dried Banana','Millet','Honey','Coconut Oil','No Refined Sugar'],nutrition:{Calories:'420 kcal',Protein:'8g',Fat:'11g',Carbs:'70g',Fibre:'6g'},weights:['200g','400g','800g']},

  chocodelightmuesli:{id:'chocodelightmuesli',name:'Choco Delight Muesli',category:'Cereals & Granola',categoryId:'cereals',price:349,badge:'Choco Boost 🍫',badgeColor:'#4a2000',bg:'#fde8d0',image:'/static/images/Choco Delight Muesli.png',imageBack:'/static/images/Choco Delight Muesli back.png',description:'A luxurious blend of multigrain flakes, dark chocolate chips, and roasted nuts. Rich, indulgent, and incredibly nutritious — breakfast that feels like a treat every morning.',ingredients:['Multigrain Flakes','Dark Chocolate Chips','Oats','Raisins','Almonds','No Artificial Flavours'],nutrition:{Calories:'440 kcal',Protein:'10g',Fat:'14g',Carbs:'66g',Fibre:'6g'},weights:['200g','400g','800g']},

  fruitnutmuesli:{id:'fruitnutmuesli',name:'Fruit & Nut Muesli',category:'Cereals & Granola',categoryId:'cereals',price:379,badge:'Power Mix 🌰',badgeColor:'#5c3d00',bg:'#fef6e8',image:'/static/images/Fruit and Nut muesli.png',imageBack:'/static/images/Fruit and Nut muesli Back.png',description:'A wholesome muesli loaded with sun-dried fruits, crunchy nuts, and toasted multigrain flakes. Rich in fibre and antioxidants — the complete breakfast that powers your day.',ingredients:['Multigrain Flakes','Almonds','Cashews','Raisins','Cranberries','Sunflower Seeds'],nutrition:{Calories:'430 kcal',Protein:'11g',Fat:'15g',Carbs:'64g',Fibre:'7g'},weights:['200g','400g','800g']},

  quinoamuesli:{id:'quinoamuesli',name:'Quinoa Muesli',category:'Cereals & Granola',categoryId:'cereals',price:399,badge:'Protein Rich 🌿',badgeColor:'#2e5c00',bg:'#edf7e6',image:'/static/images/Quinoa muesli back.png',imageBack:'/static/images/Quinoa muesli back (1).png',description:'Quinoa-enriched muesli with all 9 essential amino acids. Combined with multigrain flakes, seeds, and dried fruits — a premium protein-packed breakfast for active lifestyles.',ingredients:['Quinoa','Multigrain Flakes','Chia Seeds','Flax Seeds','Dried Berries','No Added Sugar'],nutrition:{Calories:'435 kcal',Protein:'14g',Fat:'12g',Carbs:'62g',Fibre:'8g'},weights:['200g','400g','800g']},

  /* ── PANCAKES & MIXES ── */
  blueberrypancake:{id:'blueberrypancake',name:'Blueberry Pancake',category:'Pancakes & Mixes',categoryId:'pancakes',price:249,badge:'Limited 🌿',badgeColor:'#4a2070',bg:'#ede8fb',image:'/static/images/Blueberry Pancake.png',imageBack:'/static/images/Blueberry Pancake Back.png',description:'Light, fluffy pancake bites bursting with real blueberry goodness. Made with wholesome grains and no artificial colours — a breakfast treat you can enjoy anytime.',ingredients:['Whole Wheat Flour','Real Blueberry','Oats','Honey','No Artificial Flavours','Baked Not Fried'],nutrition:{Calories:'380 kcal',Protein:'7g',Fat:'10g',Carbs:'64g',Fibre:'4g'},weights:['200g','400g']},

  chocopancake:{id:'chocopancake',name:'Choco Pancake Mix',category:'Pancakes & Mixes',categoryId:'pancakes',price:249,badge:'Choco Joy 🍫',badgeColor:'#3b1800',bg:'#fbe8d8',image:'/static/images/Choco Pancake Front.png',imageBack:'/static/images/Choco Pancake Back.png',description:'Fluffy chocolate pancakes made wholesome with millet flour and real cocoa. Quick to prepare, rich in flavour, loved by every kid — mornings just got sweeter.',ingredients:['Millet Flour','Cocoa Powder','Jaggery','Oats','Baking Powder','No Artificial Colours'],nutrition:{Calories:'395 kcal',Protein:'8g',Fat:'11g',Carbs:'65g',Fibre:'5g'},weights:['200g','400g']},

  /* ── NOODLES & SOUPS ── */
  milletnoodles:{id:'milletnoodles',name:'Millet Noodles',category:'Noodles & Soups',categoryId:'noodles',price:199,badge:'Quick Cook 🍜',badgeColor:'#0d3d6b',bg:'#e3f2fd',image:'/static/images/noodles front.png',imageBack:'/static/images/Noodles Back.png',description:'The Maggi taste you love, now made with wholesome millet. Quick-cooking noodles free from maida and artificial additives — healthy comfort food for the whole family.',ingredients:['Millet Flour','Rice Flour','Sea Salt','Natural Spices','No Maida','No Artificial Colours'],nutrition:{Calories:'360 kcal',Protein:'9g',Fat:'6g',Carbs:'68g',Fibre:'5g'},weights:['75g','200g','400g']},

  pirandaisoup:{id:'pirandaisoup',name:'Pirandai Soup Mix',category:'Noodles & Soups',categoryId:'noodles',price:249,badge:'Immunity 🌿',badgeColor:'#1a5200',bg:'#e8f5e9',image:'/static/images/Pirandai Soup Front.png',imageBack:'/static/images/Pirandai Soup Back.png',description:'Pirandai (Hadjod) — used for centuries in traditional medicine. This instant soup harnesses its bone-strengthening, immunity-boosting power in a delicious, easy-to-make cup.',ingredients:['Pirandai Powder','Lentils','Spices','Turmeric','Black Pepper','No Preservatives'],nutrition:{Calories:'120 kcal',Protein:'6g',Fat:'2g',Carbs:'18g',Fibre:'4g'},weights:['100g','250g']},

  moringasoup:{id:'moringasoup',name:'Moringa Soup Mix',category:'Noodles & Soups',categoryId:'noodles',price:249,badge:'Superfood 🌱',badgeColor:'#2e5c00',bg:'#f1f8e9',image:'/static/images/Morniga Soup Front.png',imageBack:'/static/images/Morniga Soup Back.png',description:'Moringa — the miracle tree — in a warming, flavourful soup. Packed with iron, vitamins A and C, and antioxidants — the immunity-boosting cup your body craves daily.',ingredients:['Moringa Leaf Powder','Lentils','Coconut Milk Powder','Spices','Turmeric','No Preservatives'],nutrition:{Calories:'115 kcal',Protein:'7g',Fat:'3g',Carbs:'16g',Fibre:'5g'},weights:['100g','250g']},

  mudavattukalsoup:{id:'mudavattukalsoup',name:'Mudavattukal Soup',category:'Noodles & Soups',categoryId:'noodles',price:249,badge:'Traditional 🏺',badgeColor:'#5c3d00',bg:'#fef6e8',image:'/static/images/Mudavattukal Soup Front.png',imageBack:'/static/images/Mudavattukal Soup Back.png',description:'Rooted in South Indian tradition, Mudavattukal is known for its anti-inflammatory properties. This instant mix brings the goodness of heritage herbs to your everyday meal.',ingredients:['Mudavattukal Powder','Lentils','Spices','Turmeric','Cumin','No Artificial Additives'],nutrition:{Calories:'110 kcal',Protein:'5g',Fat:'2g',Carbs:'17g',Fibre:'4g'},weights:['100g','250g']},

  /* ── HEALTH MIXES & STAPLES ── */
  datespowder:{id:'datespowder',name:'Dates Powder',category:'Health Mixes & Staples',categoryId:'health',price:299,badge:'Natural Sweet 🍯',badgeColor:'#5c2d00',bg:'#fef3e2',image:'/static/images/Dates Powder.png',imageBack:'/static/images/Dates Powder trial 2.png',description:"Pure, sun-dried date powder — nature's perfect sweetener. Use in smoothies, baking, porridges and sweets as a healthier alternative to refined sugar. Rich in iron and potassium.",ingredients:['100% Dates','No Added Sugar','No Preservatives','Vegan','Gluten-Free','Natural Processing'],nutrition:{Calories:'280 kcal',Protein:'2g',Fat:'0.5g',Carbs:'68g',Fibre:'8g'},weights:['100g','250g','500g']},
};

/* ══ TOAST ══ */
function showToast(html,duration=3000,type=''){
  const container=document.getElementById('toastContainer');
  const t=document.createElement('div');t.className='toast'+(type?' toast--'+type:'');t.innerHTML=html;
  container.appendChild(t);
  requestAnimationFrame(()=>requestAnimationFrame(()=>t.classList.add('show')));
  setTimeout(()=>{t.classList.remove('show');setTimeout(()=>t.remove(),420);},duration);
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

/* ══ CART ══ */
let cart=(()=>{try{return JSON.parse(localStorage.getItem('malola_cart'))||[];}catch{return [];}})();
const cartSidebar =document.getElementById('cartSidebar');
const cartOverlay =document.getElementById('cartOverlay');
const cartItemsEl =document.getElementById('cartItems');
const cartEmptyEl =document.getElementById('cartEmpty');
const cartFooterEl=document.getElementById('cartFooter');
const cartTotalEl =document.getElementById('cartTotal');
const cartBadgeEl =document.getElementById('cartBadge');

function openCart(){cartSidebar.classList.add('open');cartOverlay.classList.add('open');document.body.style.overflow='hidden';refreshCartPrices();}
function closeCart(){cartSidebar.classList.remove('open');cartOverlay.classList.remove('open');document.body.style.overflow='';}

document.getElementById('navCartBtn').addEventListener('click',openCart);
document.getElementById('cartClose').addEventListener('click',closeCart);
cartOverlay.addEventListener('click',closeCart);

let cartCoupon={code:'',discount:0};

function addToCart(name,price,image,slug,mrp,weight,ratio){
  const w=weight||'';
  const existing=cart.find(i=>(i.slug&&i.slug===slug&&(i.weight||'')===w)||(!slug&&i.name===name));
  if(existing){existing.qty+=1;}
  else{cart.push({name,price:parseFloat(price),image,slug:slug||'',mrp:mrp?parseFloat(mrp):null,weight:w,ratio:ratio||1,qty:1});}
  renderCart();
}

/* Re-fetch current prices when the cart opens so a stale localStorage price
   (admin changed it since "add") can never silently differ at checkout.
   Weight variants are rescaled by their stored ratio (grams/base_grams). */
let _priceRefreshAt=0;
function refreshCartPrices(){
  if(!cart.length)return;
  if(Date.now()-_priceRefreshAt<15000)return;   // throttle
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

function renderCart(){
  try{localStorage.setItem('malola_cart',JSON.stringify(cart));}catch{}
  const count=cart.reduce((s,i)=>s+i.qty,0);
  if(count>0){cartBadgeEl.style.display='flex';cartBadgeEl.textContent=count>99?'99+':count;}
  else{cartBadgeEl.style.display='none';}
  const countBadge=document.getElementById('cartCountBadge');
  if(countBadge)countBadge.textContent=count>0?`(${count} item${count!==1?'s':''})`: '';
  const cartBottom=document.getElementById('cartBottom');
  cartItemsEl.innerHTML='';
  if(cart.length===0){
    cartItemsEl.appendChild(cartEmptyEl);cartEmptyEl.style.display='block';
    if(cartBottom)cartBottom.style.display='none';
    cartCoupon={code:'',discount:0};
    const inp=document.getElementById('cartCouponInput');const msg=document.getElementById('cartCouponMsg');
    if(inp)inp.value='';if(msg){msg.style.display='none';msg.textContent='';}
    return;
  }
  cartEmptyEl.style.display='none';
  if(cartBottom)cartBottom.style.display='block';
  let subtotal=0,mrpTotal=0;
  cart.forEach(item=>{subtotal+=item.price*item.qty;mrpTotal+=(item.mrp&&item.mrp>item.price?item.mrp:item.price)*item.qty;});
  cart.forEach((item,idx)=>{
    const row=document.createElement('div');row.className='cart-item';
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
  cartItemsEl.querySelectorAll('.qty-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const idx=+btn.dataset.idx;
      if(btn.dataset.action==='inc'){cart[idx].qty+=1;}else{cart[idx].qty-=1;if(cart[idx].qty<=0)cart.splice(idx,1);}
      renderCart();
    });
  });
  cartItemsEl.querySelectorAll('.cart-item-remove').forEach(btn=>{
    btn.addEventListener('click',()=>{cart.splice(+btn.dataset.idx,1);renderCart();});
  });
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

/* ══ AUTH ══ */
function getCSRF(){return document.querySelector('meta[name="csrf-token"]')?.content||'';}
let pendingCheckout=false;

const authModal  =document.getElementById('authModal');
const authOverlay=document.getElementById('authOverlay');
function openAuth(tab){authModal.classList.add('open');authOverlay.classList.add('open');document.body.style.overflow='hidden';if(tab)switchTab(tab);}
function closeAuth(){authModal.classList.remove('open');authOverlay.classList.remove('open');document.body.style.overflow='';}
function switchTab(tab){
  document.querySelectorAll('.auth-tab').forEach(t=>t.classList.toggle('active',t.dataset.tab===tab));
  document.getElementById('loginForm').style.display   =tab==='login'   ?'block':'none';
  document.getElementById('registerForm').style.display=tab==='register'?'block':'none';
}
const navLoginBtn=document.getElementById('navLoginBtn');
const navSignupBtn=document.getElementById('navSignupBtn');
if(navLoginBtn)navLoginBtn.addEventListener('click',()=>openAuth('login'));
if(navSignupBtn)navSignupBtn.addEventListener('click',()=>openAuth('register'));

/* Profile dropdown (server-rendered logged-in state) */
(function(){
  const wrap=document.getElementById('navProfileWrap');
  if(!wrap)return;
  const btn=document.getElementById('navProfileBtn');
  const logoutBtn=document.getElementById('navLogoutBtn');
  btn.addEventListener('click',e=>{e.stopPropagation();wrap.classList.toggle('open');});
  document.addEventListener('click',()=>wrap.classList.remove('open'));
  wrap.querySelector('.nav-profile-drop').addEventListener('click',e=>e.stopPropagation());
  if(logoutBtn)logoutBtn.addEventListener('click',async()=>{
    await fetch('/api/logout/',{method:'POST',headers:{'X-CSRFToken':getCSRF()}});
    window.location.reload();
  });
})();
document.getElementById('authClose').addEventListener('click',closeAuth);
authOverlay.addEventListener('click',closeAuth);
document.querySelectorAll('.auth-tab').forEach(t=>t.addEventListener('click',()=>switchTab(t.dataset.tab)));
document.querySelectorAll('.switch-link').forEach(l=>l.addEventListener('click',e=>{e.preventDefault();switchTab(l.dataset.switch);}));

function updateNavAfterLogin(name){
  const loginBtn=document.getElementById('navLoginBtn');
  const signupBtn=document.getElementById('navSignupBtn');
  if(loginBtn)loginBtn.style.display='none';
  if(signupBtn)signupBtn.style.display='none';
  if(!document.getElementById('navProfileWrap')){
    const navActions=document.querySelector('.nav-actions');
    if(navActions){
      const initial=name.charAt(0).toUpperCase();
      const first=name.split(' ')[0];
      const wrap=document.createElement('div');
      wrap.id='navProfileWrap';wrap.className='nav-profile-wrap';
      wrap.innerHTML=`<button class="nav-profile-btn" id="navProfileBtn"><span class="nav-profile-avatar">${initial}</span><span class="nav-profile-name">${first}</span><i class="fa-solid fa-chevron-down nav-profile-caret"></i></button><div class="nav-profile-drop"><div class="npd-header"><div class="npd-avatar-lg">${initial}</div><div class="npd-info"><div class="npd-name">${name}</div></div></div><div class="npd-divider"></div><a href="/orders/" class="npd-item"><i class="fa-solid fa-bag-shopping"></i> My Orders</a><div class="npd-divider"></div><button class="npd-item npd-logout" id="_dynLogout"><i class="fa-solid fa-right-from-bracket"></i> Logout</button></div>`;
      const ham=document.getElementById('navHamburger');
      if(ham)navActions.insertBefore(wrap,ham);else navActions.appendChild(wrap);
      document.getElementById('navProfileBtn').addEventListener('click',e=>{e.stopPropagation();wrap.classList.toggle('open');});
      wrap.querySelector('.nav-profile-drop').addEventListener('click',e=>e.stopPropagation());
      document.addEventListener('click',()=>wrap.classList.remove('open'));
      document.getElementById('_dynLogout').addEventListener('click',async()=>{
        await fetch('/api/logout/',{method:'POST',headers:{'X-CSRFToken':getCSRF()}});
        window.location.reload();
      });
    }
  }
  const mobLogin=document.getElementById('mobLoginBtn');
  const mobSignup=document.getElementById('mobSignupBtn');
  if(mobLogin)mobLogin.style.display='none';
  if(mobSignup)mobSignup.style.display='none';
}

function onAuthSuccess(name){
  window.MALOLA_AUTH={authenticated:true,name};
  updateNavAfterLogin(name);
  closeAuth();
  showToast(`<i class="fa-solid fa-circle-check"></i> Welcome, ${name.split(' ')[0]}! 🎉`);
  if(pendingCheckout){pendingCheckout=false;setTimeout(buildCheckoutModal,300);}
}

async function submitAuth(url,payload,btn,errEl){
  const orig=btn.innerHTML;btn.disabled=true;btn.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>';errEl.textContent='';
  try{
    const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','X-CSRFToken':getCSRF()},body:JSON.stringify(payload)});
    const d=await r.json();
    if(d.success){onAuthSuccess(d.name);}else{errEl.textContent=d.error||'Something went wrong';}
  }catch(err){errEl.textContent='Connection error. Try again.';}
  btn.disabled=false;btn.innerHTML=orig;
}

(function(){
  const lf=document.getElementById('loginForm');
  const le=Object.assign(document.createElement('p'),{style:'color:#c62828;font-size:.8rem;font-weight:700;margin:8px 0 0;text-align:center;min-height:18px'});
  lf.appendChild(le);
  lf.addEventListener('submit',e=>{
    e.preventDefault();
    const email=lf.querySelector('input[type="email"]').value.trim();
    const password=lf.querySelector('input[type="password"]').value;
    if(!email){le.textContent='Please enter your email address';return;}
    if(!password){le.textContent='Please enter your password';return;}
    submitAuth('/api/login/',{email,password},lf.querySelector('.auth-submit'),le);
  });

  const rf=document.getElementById('registerForm');
  const re=Object.assign(document.createElement('p'),{style:'color:#c62828;font-size:.8rem;font-weight:700;margin:8px 0 0;text-align:center;min-height:18px'});
  rf.appendChild(re);
  rf.addEventListener('submit',e=>{
    e.preventDefault();
    const inputs=rf.querySelectorAll('input');
    const name=inputs[0].value.trim();
    const email=inputs[1].value.trim();
    const password=inputs[2].value;
    if(!name){re.textContent='Please enter your full name';return;}
    if(!email){re.textContent='Please enter your email address';return;}
    if(!password||password.length<6){re.textContent='Password must be at least 6 characters';return;}
    submitAuth('/api/register/',{name,email,password},rf.querySelector('.auth-submit'),re);
  });
})();

/* ══ FOOTER FORM ══ */
const footerFormEl=document.getElementById('footerForm');
if(footerFormEl)footerFormEl.addEventListener('submit',e=>{e.preventDefault();showToast('<i class="fa-solid fa-envelope"></i> You\'re subscribed!');});

/* ══ NAV SCROLL ══ */
const mainNav=document.getElementById('mainNav');
/* Product/shop pages always have a light background — keep nav scrolled at all times */
mainNav.classList.add('nav-scrolled');
window.addEventListener('scroll',()=>{mainNav.classList.add('nav-scrolled');},{passive:true});

/* ══ MOBILE HAMBURGER MENU ══ */
(function(){
  const ham=document.getElementById('navHamburger');
  const mob=document.getElementById('mobMenu');
  const overlay=document.getElementById('mobMenuOverlay');
  const close=document.getElementById('mobMenuClose');
  if(!ham||!mob||!overlay||!close)return;
  function openMob(){mob.classList.add('open');overlay.classList.add('open');ham.classList.add('open');document.body.style.overflow='hidden';}
  function closeMob(){mob.classList.remove('open');overlay.classList.remove('open');ham.classList.remove('open');document.body.style.overflow='';}
  ham.addEventListener('click',openMob);
  close.addEventListener('click',closeMob);
  overlay.addEventListener('click',closeMob);
  const mobLoginBtn=document.getElementById('mobLoginBtn');
  const mobSignupBtn=document.getElementById('mobSignupBtn');
  const mobLogoutBtn=document.getElementById('mobLogoutBtn');
  if(mobLoginBtn)mobLoginBtn.addEventListener('click',()=>{closeMob();openAuth('login');});
  if(mobSignupBtn)mobSignupBtn.addEventListener('click',()=>{closeMob();openAuth('register');});
  if(mobLogoutBtn)mobLogoutBtn.addEventListener('click',async()=>{await fetch('/api/logout/',{method:'POST',headers:{'X-CSRFToken':getCSRF()}});window.location.reload();});
  document.querySelectorAll('.mob-nav-links a').forEach(a=>a.addEventListener('click',closeMob));
})();

/* ══ CHECKOUT ══ */
let _coSaved=null;
const _esc=s=>(s||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

async function _coSubmit(name,phone,address){
  const btn=document.getElementById('coSubmit')||document.getElementById('coConfirmBtn');
  if(btn){btn.disabled=true;btn.innerHTML='Proceeding… <i class="fa-solid fa-spinner fa-spin"></i>';}
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const payload={name,phone,address,items:cart.map(i=>({name:i.name,slug:i.slug,qty:i.qty,image:i.image,weight:i.weight||''})),total,coupon_code:cartCoupon.code||''};
  try{
    const resp=await fetch('/api/place-order/',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    const data=await resp.json();
    if(data.success){
      if(data.price_changed){showToast('<i class="fa-solid fa-tag"></i> Prices updated — your total is now ₹'+Math.round(data.server_total)+'.',4000,'warn');}
      cart=[];cartCoupon={code:'',discount:0};renderCart();closeCart();closeCheckoutModal();
      setTimeout(()=>{window.location.href=data.redirect;}, data.price_changed?1200:0);
      return;
    }
    if(btn){btn.disabled=false;btn.innerHTML='Proceed to Payment <i class="fa-solid fa-arrow-right"></i>';}
    showOrderError(data);
  }catch(err){
    if(btn){btn.disabled=false;btn.innerHTML='Proceed to Payment <i class="fa-solid fa-arrow-right"></i>';}
    showToast('<i class="fa-solid fa-wifi"></i> Network error — please check your connection and try again.',3500,'error');
  }
}

function _coParseAddress(raw){
  const def={addr1:'',area:'',city:'',pincode:'',state:'',landmark:'',addrType:'Home'};
  if(!raw)return def;
  const lines=raw.split('\n').map(l=>l.trim()).filter(Boolean);
  if(lines.length<2)return{...def,addr1:raw};
  def.addr1=lines[0]||'';def.area=lines[1]||'';
  let idx=2;
  if(lines[idx]&&lines[idx].startsWith('Landmark:')){def.landmark=lines[idx].replace('Landmark:','').trim();idx++;}
  const cm=(lines[idx]||'').match(/^(.+?)\s*-\s*(\d{4,6}),\s*(.+)$/);
  if(cm){def.city=cm[1].trim();def.pincode=cm[2].trim();def.state=cm[3].trim();}else{def.city=lines[idx]||'';}
  def.addrType=(lines[idx+1]||'').replace(/\[|\]/g,'').trim()||'Home';
  return def;
}
function _coFormatAddress(addr1,area,city,pincode,state,landmark,addrType){
  const parts=[addr1,area];
  if(landmark)parts.push('Landmark: '+landmark);
  parts.push(`${city} - ${pincode}, ${state}`);
  parts.push(`[${addrType||'Home'}]`);
  return parts.filter(Boolean).join('\n');
}

function _coRenderSaved(){
  const a=_coSaved;
  const p=_coParseAddress(a.address);
  const addrText=[p.addr1,p.area,p.landmark?'Near: '+p.landmark:'',`${p.city}${p.pincode?' - '+p.pincode:''}${p.state?', '+p.state:''}`].filter(Boolean).join(', ');
  document.getElementById('coAddrSection').innerHTML=`
    <div class="co-sec-head"><i class="fa-solid fa-location-dot"></i> Saved Address</div>
    <div class="co-saved-card">
      <div style="font-weight:900;font-size:.92rem;color:#0d2b6b;margin-bottom:2px">${_esc(a.name)}</div>
      <div style="font-size:.78rem;color:rgba(13,43,107,.45);font-weight:700;margin-bottom:8px">${_esc(a.phone)}</div>
      <div style="font-size:.82rem;color:rgba(13,43,107,.6);font-weight:600;line-height:1.55;margin-bottom:14px">${_esc(addrText||a.address)}</div>
      <button id="coDeliverBtn" class="co-deliver-btn"><i class="fa-solid fa-check"></i> Deliver Here</button>
    </div>
    <div style="text-align:center;margin-top:8px">
      <button id="coNewAddrBtn" class="co-saved-link">+ Use a different address</button>
    </div>`;
  document.getElementById('coDeliverBtn').addEventListener('click',_coConfirm);
  document.getElementById('coNewAddrBtn').addEventListener('click',()=>_coRenderForm(false));
}

function _coConfirm(){
  const a=_coSaved;
  const p=_coParseAddress(a.address);
  const addrText=[p.addr1,p.area,p.landmark?'Near: '+p.landmark:'',`${p.city}${p.pincode?' - '+p.pincode:''}${p.state?', '+p.state:''}`].filter(Boolean).join(', ');
  const icon={Home:'🏠',Work:'🏢',Other:'📍'}[p.addrType]||'📍';
  document.getElementById('coAddrSection').innerHTML=`
    <div style="background:#f0fdf4;border:1.5px solid #bbf7d0;border-radius:14px;padding:14px 16px;margin-bottom:14px">
      <div style="font-size:.64rem;font-weight:900;text-transform:uppercase;letter-spacing:.08em;color:#15803d;margin-bottom:6px;display:flex;align-items:center;gap:6px">
        <i class="fa-solid fa-circle-check"></i> Delivering to ${icon} ${_esc(p.addrType||'Home')}
      </div>
      <div style="font-weight:900;font-size:.9rem;color:#0d2b6b;margin-bottom:3px">${_esc(a.name)} · ${_esc(a.phone)}</div>
      <div style="font-size:.78rem;color:rgba(13,43,107,.55);font-weight:600;line-height:1.65">${_esc(addrText)}</div>
      <button id="coChangeBtn" style="margin-top:10px;background:#fff;border:1.5px solid #e5e7eb;border-radius:8px;padding:5px 12px;font-size:.72rem;font-weight:800;color:#6b7280;cursor:pointer">✏ Change</button>
    </div>
    <button id="coConfirmBtn" class="co-submit">Proceed to Payment &nbsp;<i class="fa-solid fa-arrow-right"></i></button>`;
  document.getElementById('coChangeBtn').addEventListener('click',()=>_coRenderForm(true));
  document.getElementById('coConfirmBtn').addEventListener('click',()=>_coSubmit(a.name,a.phone,a.address));
}

function _setFieldErr(id,msg){
  const inp=document.getElementById(id);
  const err=document.getElementById(id+'Err');
  if(!inp)return;
  if(msg){inp.classList.add('co-err');if(err){err.textContent=msg;err.classList.add('show');}}
  else{inp.classList.remove('co-err');if(err)err.classList.remove('show');}
}
function _clearAllErr(){
  document.querySelectorAll('#coForm .co-input').forEach(i=>i.classList.remove('co-err'));
  document.querySelectorAll('#coForm .co-field-err').forEach(e=>e.classList.remove('show'));
}

function _coField(id,value,placeholder,type='text',maxlength=''){
  return `<div class="co-field">
    <input class="co-input" type="${type}" id="${id}" value="${_esc(value)}" placeholder="${placeholder}" autocomplete="off"${maxlength?` maxlength="${maxlength}"`:''}/>
    <div class="co-field-err" id="${id}Err"></div>
  </div>`;
}

/* Most frequent non-empty value in a list (handles pincodes spanning districts) */
function _coMajority(arr){
  const counts={};let best='',bestN=0;
  arr.filter(Boolean).forEach(v=>{counts[v]=(counts[v]||0)+1;if(counts[v]>bestN){bestN=counts[v];best=v;}});
  return best;
}

/* Auto-fill State + City/District from pincode via India Post API */
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

function _coRenderForm(prefill){
  const n=prefill&&_coSaved?_coSaved.name:'';
  const ph=prefill&&_coSaved?_coSaved.phone:'';
  const p=prefill&&_coSaved?_coParseAddress(_coSaved.address):{addr1:'',area:'',city:'',pincode:'',state:'',landmark:'',addrType:'Home'};
  document.getElementById('coAddrSection').innerHTML=`
    ${_coSaved&&!prefill?`<button id="coBackSaved" class="co-saved-link" style="margin-bottom:12px"><i class="fa-solid fa-arrow-left"></i> Use saved address</button>`:''}
    <form id="coForm" novalidate>
      <div class="co-sec-head"><i class="fa-solid fa-user"></i> Contact Information</div>
      <div class="co-row2">
        ${_coField('coName',n,'Full Name *')}
        ${_coField('coPhone',ph,'Mobile Number *','tel','10')}
      </div>
      <div class="co-sec-head"><i class="fa-solid fa-location-dot"></i> Delivery Address</div>
      <div class="co-row2">
        ${_coField('coPincode',p.pincode,'Pincode *','text','6')}
        ${_coField('coState',p.state,'State *')}
      </div>
      ${_coField('coAddr1',p.addr1,'House/Flat No., Building, Society *')}
      ${_coField('coArea',p.area,'Area / Colony / Street / Sector *')}
      <div id="coAreaSuggest" class="co-area-suggest"></div>
      <div class="co-row2">
        ${_coField('coCity',p.city,'City / District *')}
        ${_coField('coLandmark',p.landmark,'Landmark (optional)')}
      </div>
      <div class="co-sec-head"><i class="fa-solid fa-tag"></i> Save As</div>
      <div class="co-addr-type-row">
        ${['Home','Work','Other'].map(t=>`<label class="co-type-label${p.addrType===t?' active':''}" id="coLbl${t}">
          <input type="radio" name="coAddrType" value="${t}" ${p.addrType===t?'checked':''} style="display:none">
          ${{Home:'🏠 Home',Work:'🏢 Work',Other:'📍 Other'}[t]}
        </label>`).join('')}
      </div>
      <button type="submit" id="coSubmit" class="co-submit">
        Proceed to Payment &nbsp;<i class="fa-solid fa-arrow-right"></i>
      </button>
    </form>`;

  document.querySelectorAll('[name="coAddrType"]').forEach(r=>{
    r.addEventListener('change',()=>{
      document.querySelectorAll('.co-type-label').forEach(l=>l.classList.remove('active'));
      r.parentElement.classList.add('active');
    });
  });
  _coBindPincode();
  const backBtn=document.getElementById('coBackSaved');
  if(backBtn)backBtn.addEventListener('click',_coRenderSaved);

  document.getElementById('coForm').addEventListener('submit',async e=>{
    e.preventDefault();
    _clearAllErr();
    const name    =document.getElementById('coName').value.trim();
    const phone   =document.getElementById('coPhone').value.trim();
    const pincode =document.getElementById('coPincode').value.trim();
    const state   =document.getElementById('coState').value.trim();
    const addr1   =document.getElementById('coAddr1').value.trim();
    const area    =document.getElementById('coArea').value.trim();
    const city    =document.getElementById('coCity').value.trim();
    const landmark=document.getElementById('coLandmark').value.trim();
    const addrType=(document.querySelector('[name="coAddrType"]:checked')||{}).value||'Home';
    let ok=true;
    if(!name){_setFieldErr('coName','Please enter your full name.');ok=false;}
    if(!/^[6-9][0-9]{9}$/.test(phone)){_setFieldErr('coPhone','Enter a valid 10-digit mobile number.');ok=false;}
    if(!/^[0-9]{6}$/.test(pincode)){_setFieldErr('coPincode','Enter a valid 6-digit pincode.');ok=false;}
    if(!state){_setFieldErr('coState','Please enter your state.');ok=false;}
    if(!addr1){_setFieldErr('coAddr1','Please enter house/flat and building.');ok=false;}
    if(!area){_setFieldErr('coArea','Please enter area/street/sector.');ok=false;}
    if(!city){_setFieldErr('coCity','Please enter your city/district.');ok=false;}
    if(!ok){document.querySelector('#coForm .co-err')?.scrollIntoView({behavior:'smooth',block:'nearest'});return;}
    const address=_coFormatAddress(addr1,area,city,pincode,state,landmark,addrType);
    await _coSubmit(name,phone,address);
  });
}

async function buildCheckoutModal(){
  const existing=document.getElementById('checkoutModal');if(existing)existing.remove();
  if(cart.length===0){showToast('<i class="fa-solid fa-basket-shopping"></i> Your cart is empty!');return;}
  _coSaved=null;
  const subtotal=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const total=Math.max(0,subtotal-cartCoupon.discount);
  const itemsHtml=cart.map(i=>`<div class="co-item-row">
    <span class="co-item-name">${_esc(i.name)} <span>×${i.qty}</span></span>
    <span class="co-item-price">&#8377;${(i.price*i.qty).toFixed(0)}</span>
  </div>`).join('');
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
    <div id="coAddrSection"><div style="text-align:center;padding:24px;color:rgba(13,43,107,.35)"><i class="fa-solid fa-spinner fa-spin"></i></div></div>
  </div>`;
  document.body.appendChild(modal);document.body.style.overflow='hidden';
  document.getElementById('coClose').addEventListener('click',closeCheckoutModal);
  modal.addEventListener('click',e=>{if(e.target===modal)closeCheckoutModal();});
  try{
    const resp=await fetch('/api/saved-address/');
    const data=await resp.json();
    if(data.found){_coSaved=data;_coRenderSaved();}else{_coRenderForm(false);}
  }catch{_coRenderForm(false);}
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

/* ══ MEGA MENU NAVIGATION ══ */
document.querySelectorAll('.mega-item[data-pdp]').forEach(item=>{
  item.addEventListener('click',()=>{window.location.href='/product/?id='+item.dataset.pdp;});
});

/* ══ RENDER PRODUCT DETAIL PAGE (PDP only) ══ */
(function(){
  if(!document.querySelector('.pdp-main'))return;

  const params =new URLSearchParams(window.location.search);
  const pid    =params.get('id');
  /* First check hardcoded catalog; fall back to a DB product injected by Django */
  const product=productCatalog[pid]||(window.DB_PRODUCT_DATA&&window.DB_PRODUCT_DATA.id===pid?window.DB_PRODUCT_DATA:null);
  if(!product){window.location.href='/#kids-shop';return;}

  document.title=product.name+' — Malola';
  document.getElementById('pdpBcName').textContent=product.name;

  const img=document.getElementById('pdpImg');
  img.src=product.image;img.alt=product.name;

  const badge=document.getElementById('pdpImgBadge');
  badge.textContent=product.badge;badge.style.background=product.badgeColor;

  const thumbsRow=document.getElementById('pdpThumbsRow');
  const thumbImgs=[product.image];
  if(product.imageBack&&product.imageBack!==product.image)thumbImgs.push(product.imageBack);
  if(product.galleryImages&&product.galleryImages.length){
    product.galleryImages.forEach(u=>{if(!thumbImgs.includes(u))thumbImgs.push(u);});
  }
  thumbImgs.forEach((src,i)=>{
    const d=document.createElement('div');
    d.className='pdp-thumb-item'+(i===0?' active':'');
    d.innerHTML=`<img src="${src}" alt="${product.name}">`;
    d.addEventListener('click',()=>{
      img.src=src;
      document.querySelectorAll('.pdp-thumb-item').forEach(t=>t.classList.remove('active'));
      d.classList.add('active');
    });
    thumbsRow.appendChild(d);
  });

  document.getElementById('pdpCat').textContent =product.category;
  document.getElementById('pdpName').textContent=product.name;
  if(product.reviewCount!==undefined){
    const starsEl=document.querySelector('.pdp-info-stars .stars');
    const revEl  =document.querySelector('.pdp-info-stars .rev-count');
    if(starsEl){const r=Math.round(product.rating||4.5);starsEl.textContent='★'.repeat(r)+'☆'.repeat(5-r);}    
    if(revEl&&product.reviewCount>0)revEl.textContent='('+product.reviewCount+' reviews)';
  }
  const priceEl=document.getElementById('pdpPrice');
  const baseGrams=parseInt(product.weights[0]);
  let currentPrice=product.price;

  function _renderPrice(p){
    const mrp=product.discountPrice;
    if(mrp&&mrp>p){
      const pct=Math.round((mrp-p)/mrp*100);
      priceEl.innerHTML='&#8377;'+p+'<span class="pdp-mrp">&#8377;'+mrp+'</span><span class="pdp-savings">'+pct+'% off</span>';
    }else{
      priceEl.innerHTML='&#8377;'+p;
    }
  }
  _renderPrice(currentPrice);

  const weightsEl=document.getElementById('pdpWeights');
  weightsEl.innerHTML=product.weights.map((w,i)=>`<button class="pdp-w-btn${i===0?' active':''}">${w}</button>`).join('');
  weightsEl.querySelectorAll('.pdp-w-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      weightsEl.querySelectorAll('.pdp-w-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const selectedGrams=parseInt(btn.textContent);
      currentPrice=Math.round(product.price*selectedGrams/baseGrams);
      _renderPrice(currentPrice);
    });
  });

  document.getElementById('pdpDesc').textContent=product.description;
  const ingHtml=(product.ingredients||[]).map(i=>`<li>${i}</li>`).join('');
  const ingSection=document.getElementById('pdpIng');
  if(ingHtml){ingSection.innerHTML=ingHtml;}else{ingSection.closest('.pdp-info-sec')&&(ingSection.closest('.pdp-info-sec').style.display='none');}
  const nutEntries=Object.entries(product.nutrition||{});
  const nutSection=document.getElementById('pdpNut');
  if(nutEntries.length){nutSection.innerHTML=nutEntries.map(([k,v])=>`<div class="pdp-nut-cell"><div class="pdp-nut-val">${v}</div><div class="pdp-nut-lbl">${k}</div></div>`).join('');}else{nutSection.closest('.pdp-info-sec')&&(nutSection.closest('.pdp-info-sec').style.display='none');}

  let qty=1;
  const qtyEl=document.getElementById('pdpQtyVal');
  document.getElementById('pdpMinus').addEventListener('click',()=>{if(qty>1){qty--;qtyEl.textContent=qty;}});
  document.getElementById('pdpPlus').addEventListener('click',()=>{qty++;qtyEl.textContent=qty;});
  document.getElementById('pdpAddCart').addEventListener('click',()=>{
    const activeBtn=weightsEl.querySelector('.pdp-w-btn.active');
    const selectedWeight=activeBtn.textContent;
    const selectedGrams=parseInt(selectedWeight);
    const ratio=selectedGrams/baseGrams;
    const currentMrp=product.discountPrice?Math.round(product.discountPrice*ratio):null;
    for(let i=0;i<qty;i++)addToCart(product.name+' ('+selectedWeight+')',currentPrice,product.image,product.id,currentMrp,selectedWeight,ratio);
    openCart();
    showToast('<i class="fa-solid fa-basket-shopping"></i> '+product.name+' added to cart!');
  });

  const related=Object.values(productCatalog).filter(p=>p.id!==product.id).slice(0,4);
  document.getElementById('pdpRelated').innerHTML=related.map(p=>`
    <div class="pdp-rel-card" onclick="window.location.href='/product/?id=${p.id}'">
      <div class="pdp-rel-img-wrap" style="background:${p.bg}"><img src="${p.image}" alt="${p.name}" class="pdp-rel-img"></div>
      <div class="pdp-rel-body">
        <div class="pdp-rel-cat">${p.category}</div>
        <div class="pdp-rel-name">${p.name}</div>
        <div class="pdp-rel-footer"><div class="pdp-rel-price">&#8377;${p.price}</div><button class="pdp-rel-btn">View</button></div>
      </div>
    </div>`).join('');

  /* ── Brand / SKU / short desc row ── */
  const metaRowEl=document.getElementById('pdpMetaRow');
  if(metaRowEl){
    const parts=[];
    if(product.brand)parts.push('<span class="pdp-brand"><i class="fa-solid fa-building"></i> '+_esc(product.brand)+'</span>');
    if(product.sku)parts.push('<span class="pdp-sku">SKU: '+_esc(product.sku)+'</span>');
    if(parts.length)metaRowEl.innerHTML='<div class="pdp-meta-chips">'+parts.join('')+'</div>';
    if(product.shortDesc)metaRowEl.innerHTML+='<p class="pdp-shortdesc">'+_esc(product.shortDesc)+'</p>';
  }

  /* ── Health Benefits & Certifications ── */
  const healthCertsEl=document.getElementById('pdpHealthCerts');
  if(healthCertsEl){
    let html='';
    if(product.healthBenefits){
      const lines=product.healthBenefits.split('\n').map(l=>l.trim()).filter(Boolean);
      if(lines.length){
        html+='<div class="pdp-info-sec"><div class="pdp-sec-label"><i class="fa-solid fa-heart-pulse"></i> Health Benefits</div><ul class="pdp-benefits-list">'+lines.map(l=>'<li>'+_esc(l)+'</li>').join('')+'</ul></div>';
      }
    }
    const c=product.certifications||{};
    const certs=[];
    if(c.organic)certs.push('<span class="pdp-cert-badge cert-organic"><i class="fa-solid fa-leaf"></i> Organic</span>');
    if(c.nonGmo) certs.push('<span class="pdp-cert-badge cert-ngmo"><i class="fa-solid fa-dna"></i> Non-GMO</span>');
    if(c.vegan)  certs.push('<span class="pdp-cert-badge cert-vegan"><i class="fa-solid fa-seedling"></i> Vegan</span>');
    if(c.halal)  certs.push('<span class="pdp-cert-badge cert-halal"><i class="fa-solid fa-moon"></i> Halal</span>');
    if(c.iso)    certs.push('<span class="pdp-cert-badge cert-iso"><i class="fa-solid fa-award"></i> ISO</span>');
    if(certs.length){
      html+='<div class="pdp-info-sec"><div class="pdp-sec-label"><i class="fa-solid fa-certificate"></i> Certifications</div><div class="pdp-cert-row">'+certs.join('')+'</div></div>';
    }
    healthCertsEl.innerHTML=html;
  }

  /* ── Product Details table ── */
  const detailsEl=document.getElementById('pdpDetailsSection');
  if(detailsEl&&product.productInfo){
    const pi=product.productInfo;
    const rows=[];
    if(pi.packageSize)       rows.push(['Package Size',pi.packageSize]);
    if(pi.countryOfOrigin)   rows.push(['Country of Origin',pi.countryOfOrigin]);
    if(pi.shelfLife)         rows.push(['Shelf Life',pi.shelfLife]);
    if(pi.storageInstructions)rows.push(['Storage Instructions',pi.storageInstructions]);
    if(pi.manufacturerDetails)rows.push(['Manufacturer',pi.manufacturerDetails]);
    if(rows.length){
      detailsEl.innerHTML='<div class="pdp-section"><h3 class="pdp-section-title"><i class="fa-solid fa-list-ul"></i> Product Details</h3><table class="pdp-details-table">'+rows.map(([k,v])=>'<tr><th>'+k+'</th><td>'+_esc(v)+'</td></tr>').join('')+'</table></div>';
    }
  }

  /* ── Recipe section ── */
  const recipeEl=document.getElementById('pdpRecipeSection');
  if(recipeEl&&product.recipe){
    const r=product.recipe;
    const metaItems=[];
    if(r.prepTime)metaItems.push('<span><i class="fa-regular fa-clock"></i> Prep: '+_esc(r.prepTime)+'</span>');
    if(r.cookTime)metaItems.push('<span><i class="fa-solid fa-fire"></i> Cook: '+_esc(r.cookTime)+'</span>');
    if(r.servings)metaItems.push('<span><i class="fa-solid fa-utensils"></i> Serves '+_esc(r.servings)+'</span>');
    const ingLines=r.ingredients?r.ingredients.split('\n').map(l=>l.trim()).filter(Boolean).map(l=>'<li>'+_esc(l)+'</li>').join(''):'';
    const instLines=r.instructions?r.instructions.split('\n').map(l=>l.trim()).filter(Boolean).map(l=>'<li>'+_esc(l)+'</li>').join(''):'';
    const colsHtml=(ingLines||instLines)?'<div class="pdp-recipe-cols">'+(ingLines?'<div class="pdp-recipe-col"><h4>Ingredients</h4><ul>'+ingLines+'</ul></div>':'')+(instLines?'<div class="pdp-recipe-col"><h4>Instructions</h4><ol>'+instLines+'</ol></div>':'')+'</div>':'';
    const imgHtml=r.image?'<div class="pdp-recipe-img-wrap"><img src="'+r.image+'" alt="'+_esc(r.name)+'"></div>':'';
    const vidHtml=r.videoUrl?'<div style="margin-top:18px"><a href="'+_esc(r.videoUrl)+'" target="_blank" rel="noopener" class="pdp-recipe-video-link"><i class="fa-brands fa-youtube"></i> Watch Recipe Video</a></div>':'';
    recipeEl.innerHTML='<div class="pdp-section"><h3 class="pdp-section-title"><i class="fa-solid fa-utensils"></i> '+_esc(r.name)+'</h3>'+(metaItems.length?'<div class="pdp-recipe-meta">'+metaItems.join('')+'</div>':'')+'<div class="pdp-recipe-body">'+imgHtml+colsHtml+vidHtml+'</div></div>';
  }
})();

