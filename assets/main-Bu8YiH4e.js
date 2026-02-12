(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const h of r.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&s(h)}).observe(document,{childList:!0,subtree:!0});function a(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=a(i);fetch(i.href,r)}})();const M="https://your-energy.b.goit.study/api";async function St(){const t=await fetch(`${M}/quote`);if(!t.ok)throw new Error("Failed to fetch quote");return t.json()}async function Mt({filter:t,page:e=1,limit:a=10}={}){if(!t)throw new Error("Filter is required");const s=new URLSearchParams({filter:t,page:String(e),limit:String(a)}),i=await fetch(`${M}/filters?${s}`);if(!i.ok)throw new Error("Failed to fetch filters");return i.json()}async function Tt(t){const e=new URLSearchParams;Object.entries(t).forEach(([s,i])=>{i!=null&&i!==""&&e.append(s,i)});const a=await fetch(`${M}/exercises?${e.toString()}`);if(!a.ok)throw new Error("Failed to fetch exercises");return a.json()}async function Pt(t){if(!t)throw new Error("Exercise id is required");const e=await fetch(`${M}/exercises/${t}`);if(!e.ok)throw new Error("Failed to fetch exercise");return e.json()}async function qt(t,{rate:e,email:a,review:s}){const i=await fetch(`${M}/exercises/${t}/rating`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({rate:e,email:a,review:s})});if(!i.ok)throw new Error("Failed to rate exercise");return i.json()}async function At(t){const e=await fetch(`${M}/subscription`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t})});if(!e.ok){let a="Failed to subscribe";try{const i=await e.json();i!=null&&i.message&&(a=i.message)}catch{}const s=new Error(a);throw s.status=e.status,s}return e.json()}const D=document.querySelectorAll(".quote__container p, .favorite-quote__wrapper p"),K=document.querySelectorAll(".quote__author-name"),Ft="The only bad workout is the one that didn’t happen.",it="Unknown";async function kt(){if(!(!D.length||!K.length))try{const t=await St();if(!t||!t.quote)throw new Error("Empty quote");D.forEach(e=>{e.textContent=t.quote}),K.forEach(e=>{e.textContent=t.author||it})}catch{D.forEach(e=>{e.textContent=Ft}),K.forEach(e=>{e.textContent=it})}}const G=document.querySelector(".exersices__list");let rt="Muscles",Y=null;function Ct(t){G&&(Y=t,G.addEventListener("click",e=>{const a=e.target.closest(".btnFilters");a&&(G.querySelectorAll(".btnFilters").forEach(s=>s.classList.remove("active")),a.classList.add("active"),rt=a.textContent.trim(),Y&&Y(rt))}))}const R=document.querySelector(".exercises__pagination");let c=1,E=1;function It(){R&&R.addEventListener("click",t=>{const e=t.target.closest("button[data-direction]");if(!e)return;const a=e.dataset.direction;if(a==="prev"&&c>1){c-=1,ct(c),W();return}a==="next"&&c<E&&(c+=1,ct(c),W())})}function j(t,e){c=Number.isFinite(t)?t:1,E=Number.isFinite(e)&&e>0?e:1,c>E&&(c=E),W()}function W(){R&&(R.innerHTML=`
    <button type="button" data-direction="prev" ${c===1?"disabled":""} aria-label="Previous page">&lt;</button>
    <span>${c} / ${E}</span>
    <button type="button" data-direction="next" ${c===E?"disabled":""} aria-label="Next page">&gt;</button>
  `)}const ht="/your-energy-Course/assets/sprite-Da3IUN7k.svg",bt="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2043%2032'%20fill='none'%3e%3cpath%20d='M6.933%204.571h-3.2c-0.888%200-1.6%200.765-1.6%201.715v7.429h-1.6c-0.293%200-0.533%200.256-0.533%200.571v3.429c0%200.315%200.24%200.571%200.533%200.571h1.6v7.429c0%200.949%200.712%201.715%201.6%201.715h3.2c0.888%200%201.6-0.765%201.6-1.715v-19.429c0-0.949-0.715-1.715-1.6-1.715zM42.133%2013.715h-1.6v-7.429c0-0.949-0.715-1.715-1.6-1.715h-3.2c-0.885%200-1.6%200.765-1.6%201.715v19.429c0%200.949%200.715%201.715%201.6%201.715h3.2c0.885%200%201.6-0.765%201.6-1.715v-7.429h1.6c0.293%200%200.533-0.256%200.533-0.571v-3.429c0-0.315-0.24-0.571-0.533-0.571zM30.4%200h-3.2c-0.885%200-1.6%200.765-1.6%201.715v12h-8.533v-12c0-0.949-0.715-1.715-1.6-1.715h-3.2c-0.885%200-1.6%200.765-1.6%201.715v28.571c0%200.949%200.715%201.715%201.6%201.715h3.2c0.888%200%201.6-0.765%201.6-1.715v-12h8.533v12c0%200.949%200.715%201.715%201.6%201.715h3.2c0.885%200%201.6-0.765%201.6-1.715v-28.571c0-0.949-0.715-1.715-1.6-1.715z'%20fill='%23F4F4F4'%20/%3e%3c/svg%3e",T="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2034%2032'%20fill='none'%3e%3cpath%20d='M15.24%201.561c0.505-1.551%202.7-1.551%203.203%200l2.558%207.872c0.227%200.68%200.857%201.162%201.6%201.162h8.278c1.632%200%202.309%202.088%200.99%203.048l-6.696%204.864c-0.423%200.31-0.694%200.804-0.694%201.362%200%200.186%200.03%200.365%200.086%200.533l-0.003-0.012%202.557%207.872c0.505%201.553-1.272%202.843-2.592%201.883l-6.695-4.864c-0.274-0.201-0.618-0.322-0.99-0.322s-0.716%200.121-0.995%200.325l0.005-0.003-6.696%204.864c-1.319%200.96-3.096-0.332-2.59-1.883l2.557-7.872c0.052-0.155%200.082-0.335%200.082-0.521%200-0.558-0.271-1.052-0.689-1.359l-0.005-0.003-6.696-4.864c-1.319-0.96-0.64-3.048%200.99-3.048h8.276c0%200%200%200%200%200%200.744%200%201.374-0.482%201.598-1.15l0.003-0.012%202.56-7.872z'%20fill='%23EEA10C'%20/%3e%3c/svg%3e",u=document.querySelector(".filters__list.js-list"),L=document.querySelector(".search__form"),P=document.querySelector(".search__input"),H=document.querySelector(".search__button"),J=document.querySelector(".exersices__title"),yt="(max-width: 767px)",Nt=9,Bt=12;let f=1,q="Muscles",m="",g=null,v="categories",X=window.matchMedia(yt).matches,nt=null;function Ot(){L&&(L.classList.remove("hidden"),L.setAttribute("aria-hidden","false"),P&&(P.disabled=!1),H&&(H.disabled=!1))}function Ut(){L&&(L.classList.add("hidden"),L.setAttribute("aria-hidden","true"),P&&(P.value="",P.disabled=!0),H&&(H.disabled=!0),m="")}function at(){if(J){if(v==="exercises"&&g){J.innerHTML=`
      <button type="button" class="exercises-title__base exercises-title__base--link">
        Exercises
      </button>
      <span class="exercises-title__slash">/</span>
      <span class="exercises-title__current">${g}</span>
    `;return}J.textContent="Exercises"}}function wt(){return X?Nt:Bt}function V(t){u&&(u.innerHTML=`
    <li class="filters__state">${t}</li>
  `)}async function y(){u&&(at(),v==="categories"?await Rt():await jt())}async function Rt(){Ut(),at(),u&&u.classList.remove("filters__list--exercises");try{const t=await Mt({filter:q,page:f,limit:wt()}),e=t.results||[];if(!e.length){V("No categories found for this filter."),j(1,1);return}u.innerHTML=e.map(a=>`
        <li class="filters__item" data-category="${a.name}">
          <img class="filters__img-first" src="${a.imgURL}" alt="${a.name}" />
          <div class="filters__wrapper-first">
            <h3 class="filters__title-first">${a.name}</h3>
            <p class="filters__text-first">${a.filter}</p>
          </div>
        </li>
      `).join(""),j(f,t.totalPages||1)}catch(t){console.error(t),V("Unable to load categories. Please try again.")}}async function jt(){if(g){Ot(),at(),u&&u.classList.add("filters__list--exercises");try{const t={page:f,limit:wt()},e=Vt();t[e]=g,m&&m.length>=2&&(t.keyword=m);const a=await Tt(t),s=a.results||[];if(!s.length){V("No exercises found for this request."),j(1,1);return}u.innerHTML=s.map(i=>Ht(i)).join(""),j(f,a.totalPages||1)}catch(t){console.error(t),V("Unable to load exercises. Please try again.")}}}function Ht(t){const e=(t.rating||0).toFixed(2),a=t.burnedCalories??"--",s=t.time??"--",i=t.bodyPart||"",r=t.target||"";return`
    <li class="filters__item-card exercise-card-item" data-id="${t._id}">
      <div class="card__wrap">
        <div class="card__block-btn">
          <span class="card__badge">WORKOUT</span>
          <span class="card__rating">
            ${e}
            <img class="card__rating-star" src="${T}" alt="" aria-hidden="true" />
          </span>
          <button class="card__btn" type="button" data-id="${t._id}">
            Start
            <svg class="card__btn-arrow" width="16" height="16">
              <use href="${ht}#icon-arrow"></use>
            </svg>
          </button>
        </div>

        <div class="card__wrap-title">
          <div class="card__title-svg">
            <img src="${bt}" alt="" aria-hidden="true" />
          </div>
          <h3 class="card__title">${t.name}</h3>
        </div>

              <div class="card__block-info">
                <p class="card__text-info">
                  <span>Burned calories:</span>${a} / ${s} min
                </p>
                ${i?`<p class="card__text-info"><span>Body part:</span>${i}</p>`:""}
                ${r?`<p class="card__text-info"><span>Target:</span>${r}</p>`:""}
              </div>
      </div>
    </li>
  `}function Vt(){return q==="Muscles"?"muscles":q==="Body parts"?"bodypart":q==="Equipment"?"equipment":"muscles"}document.addEventListener("click",t=>{if(t.target.classList.contains("exercises-title__base--link")){g=null,m="",f=1,v="categories",y();return}const e=t.target.closest(".filters__item[data-category]");!e||!e.dataset.category||v!=="categories"||(g=e.dataset.category,f=1,m="",v="exercises",y())});function zt(t){q=t,g=null,m="",f=1,v="categories",y()}function ot(t){if(!g||v!=="exercises")return;const e=t.trim().toLowerCase();e!==m&&(m=e,f=1,v="exercises",y())}function ct(t){!Number.isFinite(t)||t<1||(f=t,y())}function Dt(){const t=window.matchMedia(yt).matches;t!==X&&(X=t,f=1,y())}u&&window.addEventListener("resize",()=>{window.clearTimeout(nt),nt=window.setTimeout(Dt,150)});const O=document.querySelector(".search"),lt=document.querySelector(".search__form"),dt=document.querySelector(".search__button");function Kt(t,e=300){let a;return(...s)=>{window.clearTimeout(a),a=window.setTimeout(()=>t(...s),e)}}function Gt(){if(!O)return;const t=a=>{const s=a.trim().toLowerCase();if(!s||s.length<2){ot("");return}ot(s)};lt&&lt.addEventListener("submit",a=>{a.preventDefault(),t(O.value)}),dt&&dt.addEventListener("click",()=>{t(O.value)});const e=Kt(a=>{t(a.target.value)});O.addEventListener("input",e)}const Et="favorites";function Yt(t){try{const e=JSON.parse(t);return Array.isArray(e)?e:[]}catch{return[]}}function $(){const t=localStorage.getItem(Et)||"[]";return Yt(t).filter(e=>e&&e._id)}function Lt(t){localStorage.setItem(Et,JSON.stringify(t)),window.dispatchEvent(new CustomEvent("favorites:changed",{detail:{favorites:t}}))}function Jt(t){return t?$().some(e=>e._id===t):!1}function Qt(t){if(!t)return $();const a=$().filter(s=>s._id!==t);return Lt(a),a}function Wt(t){if(!t||!t._id)return{favorites:$(),isFavorite:!1};const e=$(),a=e.some(i=>i._id===t._id),s=a?e.filter(i=>i._id!==t._id):[...e,t];return Lt(s),{favorites:s,isFavorite:!a}}let n=null,x=null,A=null;function $t(t){return t?"&#9829;":"&#9825;"}function Xt(){n=document.createElement("div"),n.className="modal-overlay",n.style.display="none",document.body.appendChild(n),document.addEventListener("click",async t=>{const e=t.target.closest(".card__btn[data-id]");if(e){await ut(e.dataset.id);return}const a=t.target.closest(".exercise-card-item[data-id]");a&&await ut(a.dataset.id)}),n.addEventListener("click",t=>{if(t.target===n||t.target.closest(".modal__close")){Z();return}if(t.target.closest(".modal__give-rating")){Zt();return}const e=t.target.closest(".modal__add-favorite");if(e&&x){const{isFavorite:a}=Wt(x);e.dataset.action=a?"remove":"add",e.innerHTML=`
        ${a?"Remove from favorites":"Add to favorites"}
        <span class="modal__fav-icon" aria-hidden="true">${$t(a)}</span>
      `}}),n.addEventListener("submit",async t=>{t.target.classList.contains("rating-form")&&(t.preventDefault(),await ee(t.target))}),document.addEventListener("keydown",t=>{t.key==="Escape"&&n.style.display==="flex"&&Z()}),A=document.createElement("div"),A.className="toast-container",document.body.appendChild(A)}async function ut(t){if(t)try{const e=await Pt(t);x=e;const a=Jt(e==null?void 0:e._id),s=Number((e==null?void 0:e.rating)||0).toFixed(1);n.innerHTML=`
      <div class="modal">
        <button type="button" class="modal__close" aria-label="Close modal">&times;</button>
        
        <div class="modal__content">
          <div class="modal__image">
            ${e.gifUrl?`<img src="${e.gifUrl}" alt="${e.name}" loading="lazy" />`:""}
          </div>
          
          <div class="modal__info">
            <h2 class="modal__title">${e.name}</h2>
            
            <div class="modal__rating-display">
              <span class="modal__rating-value">${s}</span>
              <div class="modal__stars" role="img" aria-label="Rating ${s} out of 5">
                ${te(e.rating)}
              </div>
            </div>

            <div class="modal__divider"></div>

            <div class="modal__facts-grid">
              <div class="modal__fact">
                <span class="modal__fact-label">Target</span>
                <span class="modal__fact-value">${e.target||"N/A"}</span>
              </div>
              <div class="modal__fact">
                <span class="modal__fact-label">Body Part</span>
                <span class="modal__fact-value">${e.bodyPart||"N/A"}</span>
              </div>
              <div class="modal__fact">
                <span class="modal__fact-label">Equipment</span>
                <span class="modal__fact-value">${e.equipment||"N/A"}</span>
              </div>
              <div class="modal__fact">
                <span class="modal__fact-label">Popular</span>
                <span class="modal__fact-value">${e.popularity||"N/A"}</span>
              </div>
            </div>

            <div class="modal__fact modal__fact--burned">
              <span class="modal__fact-label">Burned calories</span>
              <span class="modal__fact-value">${e.burnedCalories||"N/A"}/${e.time||"N/A"} min</span>
            </div>

            <div class="modal__divider"></div>
            
            <p class="modal__description">${e.description||""}</p>
            
            <div class="modal__actions">
              <button type="button" class="modal__add-favorite" data-action="${a?"remove":"add"}">
                ${a?"Remove from favorites":"Add to favorites"}
                <span class="modal__fav-icon" aria-hidden="true">${$t(a)}</span>
              </button>
              <button type="button" class="modal__give-rating">Give a rating</button>
            </div>
          </div>
        </div>
      </div>
    `,n.style.display="flex",document.body.style.overflow="hidden"}catch{tt("Could not load exercise details")}}function Zt(){if(!x)return;n.innerHTML=`
    <div class="modal modal--rating">
      <button type="button" class="modal__close" aria-label="Close modal">&times;</button>
      
      <h3 class="modal__rating-title">Rating</h3>
      
      <form class="rating-form" data-id="${x._id}">
        <div class="rating-stars">
          <span class="rating-value">0.0</span>
          <div class="rating-stars-input">
            <input type="radio" name="rate" value="1" id="star1" required>
            <label for="star1">&#9734;</label>
            <input type="radio" name="rate" value="2" id="star2">
            <label for="star2">&#9734;</label>
            <input type="radio" name="rate" value="3" id="star3">
            <label for="star3">&#9734;</label>
            <input type="radio" name="rate" value="4" id="star4">
            <label for="star4">&#9734;</label>
            <input type="radio" name="rate" value="5" id="star5">
            <label for="star5">&#9734;</label>
          </div>
        </div>
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          class="rating-email"
          required
        />
        
        <textarea
          name="review"
          placeholder="Your comment"
          class="rating-comment"
          rows="4"
        ></textarea>
        
        <button type="submit" class="rating-submit">Send</button>
      </form>
    </div>
  `;const t=n.querySelectorAll('input[name="rate"]'),e=n.querySelector(".rating-value");t.forEach(a=>{a.addEventListener("change",s=>{e.textContent=`${s.target.value}.0`})})}function te(t){const e=Number(t)||0,a=Math.min(Math.max(e,0),5),s=Math.floor(a),i=a-s,r=i>=.25&&i<.75,h=i>=.75?s+1:s;let w="";for(let _=0;_<5;_+=1){if(_<h&&(!r||_<s)){w+=`
        <span class="modal__star modal__star--full" aria-hidden="true">
          <img src="${T}" alt="" aria-hidden="true" />
        </span>
      `;continue}if(_===s&&r){w+=`
        <span class="modal__star modal__star--half" aria-hidden="true">
          <img class="modal__star-base" src="${T}" alt="" aria-hidden="true" />
          <img class="modal__star-fill" src="${T}" alt="" aria-hidden="true" />
        </span>
      `;continue}w+=`
      <span class="modal__star modal__star--empty" aria-hidden="true">
        <img src="${T}" alt="" aria-hidden="true" />
      </span>
    `}return w}async function ee(t){const e=new FormData(t),a=t.dataset.id;try{await qt(a,{rate:Number(e.get("rate")),email:e.get("email"),review:e.get("review")||""}),tt("Thank you for your rating!"),Z()}catch{tt("Failed to submit rating. Please try again.")}}function Z(){n&&(n.style.display="none",document.body.style.overflow="",x=null)}function tt(t){if(!A)return;const e=document.createElement("div");e.className="toast",e.textContent=t,A.appendChild(e),requestAnimationFrame(()=>{e.classList.add("toast--visible")}),window.setTimeout(()=>{e.classList.remove("toast--visible"),window.setTimeout(()=>e.remove(),250)},2200)}const F=document.querySelector(".footer-form"),l=document.querySelector(".footer-input"),Q=document.querySelector("#subscribeBtn"),ae=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;function se(){return F?F.querySelector(".footer-form__status"):null}function k(t,e){const a=se();a&&(a.textContent=t,a.className="footer-form__status",e&&a.classList.add(`is-${e}`))}function ie(){k("","")}function ft(t){l&&(l.classList.add("is-invalid"),l.setAttribute("aria-invalid","true"),k(t,"error"))}function mt(){l&&(l.classList.remove("is-invalid"),l.removeAttribute("aria-invalid"))}function _t(t){Q&&(Q.disabled=t,Q.textContent=t?"Sending...":"Send"),l&&(l.disabled=t)}function re(t){return ae.test(t)}function ne(t){return(t==null?void 0:t.status)===409?"This email is already subscribed.":(t==null?void 0:t.status)===400?"Please provide a valid email address.":"Subscription failed. Please try again later."}function oe(){!F||!l||(l.addEventListener("input",()=>{mt(),ie()}),F.addEventListener("submit",async t=>{t.preventDefault();const e=l.value.trim().toLowerCase();if(!e){ft("Please enter your email.");return}if(!l.checkValidity()||!re(e)){ft("Please enter a valid email address.");return}mt(),k("Sending subscription...","pending"),_t(!0);try{await At(e),F.reset(),k("Thanks! You are subscribed.","success")}catch(a){k(ne(a),"error")}finally{_t(!1)}}))}const S=document.querySelector("[data-menu-open-btn]"),pt=document.querySelector("[data-menu-close-btn]"),p=document.querySelector("[data-menu-backdrop]"),N=document.querySelector(".js-menu-container"),ce=document.querySelectorAll(".mobile-menu__nav-link");function le(){!p||!N||!S||(p.classList.remove("is-hidden"),N.classList.add("is-open"),document.body.classList.add("no-scroll"),S.setAttribute("aria-expanded","true"))}function U(){!p||!N||!S||(N.classList.remove("is-open"),p.classList.add("is-hidden"),document.body.classList.remove("no-scroll"),S.setAttribute("aria-expanded","false"))}function de(){!S||!pt||!p||!N||(S.addEventListener("click",le),pt.addEventListener("click",U),p.addEventListener("click",t=>{t.target===p&&U()}),document.addEventListener("keydown",t=>{t.key==="Escape"&&!p.classList.contains("is-hidden")&&U()}),ce.forEach(t=>{t.addEventListener("click",U)}))}const ue="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2029%2032'%20fill='none'%3e%3cpath%20d='M19.733%208V6.933c0-1.493%200-2.24-0.29-2.81a2.661%202.661%200%200%200-1.167-1.166c-0.57-0.29-1.317-0.29-2.81-0.29h-2.134c-1.493%200-2.24%200-2.81%200.29a2.661%202.661%200%200%200-1.166%201.166c-0.29%200.57-0.29%201.317-0.29%202.81V8M11.733%2015.333V22M17.067%2015.333V22M2.4%208h24M23.733%208v14.933c0%202.24%200%203.36-0.435%204.216a4.005%204.005%200%200%201-1.749%201.749c-0.854%200.435-1.976%200.435-4.216%200.435h-5.866c-2.24%200-3.36%200-4.216-0.435a4.005%204.005%200%200%201-1.749-1.749c-0.435-0.856-0.435-1.976-0.435-4.216V8'%20stroke='%23242424'%20stroke-width='2.4'%20stroke-linecap='round'%20stroke-linejoin='round'%20/%3e%3c/svg%3e",C=document.querySelector(".favorites__list.js-list"),b=document.querySelector(".js-favorites-pagination"),xt="(max-width: 767px)",fe=8,me=10;let o=1,d=[],et=window.matchMedia(xt).matches,vt=null;C&&(d=$(),I(d),window.addEventListener("favorites:changed",t=>{var s;const e=((s=t.detail)==null?void 0:s.favorites)||[];d=Array.isArray(e)?e:[];const a=B(d.length);o>a&&(o=a),I(e)}),C.addEventListener("click",t=>{var i;const e=t.target.closest(".fav-card__delete");if(!e)return;t.preventDefault(),t.stopPropagation();const a=e.closest(".exercise-card-item[data-id]"),s=(i=a==null?void 0:a.dataset)==null?void 0:i.id;s&&Qt(s)}),window.addEventListener("resize",()=>{window.clearTimeout(vt),vt=window.setTimeout(()=>{const t=window.matchMedia(xt).matches;if(t===et)return;et=t;const e=B(d.length);o>e&&(o=e),I(d)},150)}));b&&b.addEventListener("click",t=>{const e=t.target.closest("button[data-direction]");if(!e)return;const a=B(d.length),s=e.dataset.direction;if(s==="prev"&&o>1){o-=1,I(d);return}s==="next"&&o<a&&(o+=1,I(d))});function I(t){if(!C)return;const e=Array.isArray(t)?t:[];if(d=e,!e.length){o=1,C.innerHTML=`
      <li class="favorites__empty">
        It appears that you haven't added any exercises to your favorites yet. To get started, you can add exercises that you like to your favorites for easier access in the future.
      </li>
    `,gt(0);return}const a=B(e.length);o>a&&(o=a);const s=(o-1)*z(),i=e.slice(s,s+z());C.innerHTML=i.map(r=>{const h=r.burnedCalories??"--",w=r.time??"--",_=r.bodyPart||"",st=r.target||"";return`
        <li class="fav-filters__item-card exercise-card-item" data-id="${r._id}">
          <div class="card__wrap">
            <div class="card__block-btn">
              <div class="fav-card__meta">
                <span class="card__badge">WORKOUT</span>
                <button class="fav-card__delete" type="button" aria-label="Remove from favorites" title="Remove from favorites">
                  <img class="fav-card__delete-icon" src="${ue}" alt="" aria-hidden="true" />
                </button>
              </div>

              <button class="card__btn" type="button" data-id="${r._id}">
                Start
                <svg class="card__btn-arrow" width="16" height="16">
                  <use href="${ht}#icon-arrow"></use>
                </svg>
              </button>
            </div>

            <div class="card__wrap-title">
              <div class="card__title-svg">
                <img src="${bt}" alt="" aria-hidden="true" />
              </div>
              <h3 class="card__title">${r.name}</h3>
            </div>

            <div class="card__block-info">
              <p class="card__text-info">
                <span>Burned calories:</span>${h} / ${w} min
              </p>
              ${_?`<p class="card__text-info"><span>Body part:</span>${_}</p>`:""}
              ${st?`<p class="card__text-info"><span>Target:</span>${st}</p>`:""}
            </div>
          </div>
        </li>
      `}).join(""),gt(e.length)}function z(){return et?fe:me}function B(t){return t?Math.max(1,Math.ceil(t/z())):1}function gt(t){if(!b)return;const e=B(t);if(t<=z()){b.innerHTML="",b.classList.add("hidden");return}b.classList.remove("hidden"),b.innerHTML=`
    <button type="button" data-direction="prev" ${o===1?"disabled":""} aria-label="Previous favorites page">&lt;</button>
    <span>${o} / ${e}</span>
    <button type="button" data-direction="next" ${o===e?"disabled":""} aria-label="Next favorites page">&gt;</button>
  `}function _e(){kt(),Ct(t=>{zt(t)}),y(),Gt(),It(),Xt(),oe(),de()}_e();
//# sourceMappingURL=main-Bu8YiH4e.js.map
