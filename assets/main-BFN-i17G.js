(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const f of i.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&r(f)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}})();const g="https://your-energy.b.goit.study/api";async function D(){const t=await fetch(`${g}/quote`);if(!t.ok)throw new Error("Failed to fetch quote");return t.json()}async function J(t){const e=new URLSearchParams({filter:t}),a=await fetch(`${g}/filters?${e}`);if(!a.ok)throw new Error("Failed to fetch filters");return a.json()}async function W(t){const e=new URLSearchParams;Object.entries(t).forEach(([r,s])=>{s!=null&&s!==""&&e.append(r,s)});const a=await fetch(`${g}/exercises?${e.toString()}`);if(!a.ok)throw new Error("Failed to fetch exercises");return a.json()}async function G(t){if(!t)throw new Error("Exercise id is required");const e=await fetch(`${g}/exercises/${t}`);if(!e.ok)throw new Error("Failed to fetch exercise");return e.json()}async function Q(t,{rate:e,email:a,review:r}){const s=await fetch(`${g}/exercises/${t}/rating`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({rate:e,email:a,review:r})});if(!s.ok)throw new Error("Failed to rate exercise");return s.json()}async function Y(t){const e=await fetch(`${g}/subscription`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t})});if(!e.ok)throw new Error("Failed to subscribe");return e.json()}const x=document.querySelectorAll(".quote__container p, .favorite-quote__wrapper p"),S=document.querySelectorAll(".quote__author-name"),z="The only bad workout is the one that didn’t happen.",A="Unknown";async function V(){if(!(!x.length||!S.length))try{const t=await D();if(!t||!t.quote)throw new Error("Empty quote");x.forEach(e=>{e.textContent=t.quote}),S.forEach(e=>{e.textContent=t.author||A})}catch{x.forEach(e=>{e.textContent=z}),S.forEach(e=>{e.textContent=A})}}const T=document.querySelector(".exersices__list");let O="Muscles",C=null;function X(t){T&&(C=t,T.addEventListener("click",e=>{const a=e.target.closest(".btnFilters");a&&(T.querySelectorAll(".btnFilters").forEach(r=>r.classList.remove("active")),a.classList.add("active"),O=a.textContent.trim(),C&&C(O))}))}const b=document.querySelector(".pagination");let c=1,w=1;function Z(){b&&b.addEventListener("click",t=>{const e=t.target;if(e.tagName==="BUTTON"){const a=e.textContent.trim();a==="<"&&c>1?(c--,N(c),F()):a===">"&&c<w&&(c++,N(c),F())}})}function $(t,e){c=t,w=e,F()}function F(){b&&(b.innerHTML=`
    <button ${c===1?"disabled":""}>&lt;</button>
    <span>${c} / ${w}</span>
    <button ${c===w?"disabled":""}>&gt;</button>
  `)}const o=document.querySelector(".filters__list.js-list"),E=document.querySelector(".search__form"),q=document.querySelector(".exersices__title");let u=1,v="Muscles",l="",d=null,m="categories";function tt(){E&&(E.style.display="block")}function et(){E&&(E.style.display="none");const t=document.querySelector(".search__input");t&&(t.value=""),l=""}function k(){if(q){if(m==="exercises"&&d){q.innerHTML=`
      <button type="button" class="exercises-title__base exercises-title__base--link">
        Exercises
      </button>
      <span class="exercises-title__slash">/</span>
      <span class="exercises-title__current">${d}</span>
    `;return}q.textContent="Exercises"}}async function p(){o&&(k(),m==="categories"?await at():await st())}async function at(){et(),k(),o&&o.classList.remove("filters__list--exercises");try{const t=await J(v),e=t.results||[];if(!e.length){o.innerHTML="",$(1,1);return}o.innerHTML=e.map(a=>`
        <li class="filters__item" data-category="${a.name}">
          <img class="filters__img-first" src="${a.imgURL}" alt="${a.name}" />
          <div class="filters__wrapper-first">
            <h3 class="filters__title-first">${a.name}</h3>
            <p class="filters__text-first">${a.filter}</p>
          </div>
        </li>
      `).join(""),$(1,t.totalPages||1)}catch(t){console.error(t),o.innerHTML=""}}async function st(){if(d){tt(),k(),o&&o.classList.add("filters__list--exercises");try{const t={page:u,limit:10},e=it();t[e]=d,l&&l.length>=2&&(t.keyword=l);const a=await W(t),r=a.results||[];if(!r.length){o.innerHTML="",$(1,1);return}o.innerHTML=r.map(s=>rt(s)).join(""),$(u,a.totalPages||1)}catch(t){console.error(t),o.innerHTML=""}}}function rt(t){const e=(t.rating||0).toFixed(2),a=t.burnedCalories??"--",r=t.time??"--",s=t.bodyPart||"",i=t.target||"";return`
    <li class="filters__item-card exercise-card-item" data-id="${t._id}">
      <div class="card__wrap">
        <div class="card__block-btn">
          <span class="card__badge">WORKOUT</span>
          <span class="card__rating">
            ${e}
            <svg class="card__rating-star" width="18" height="18">
              <use href="./img/sprite.svg#icon-star-rating"></use>
            </svg>
          </span>
          <button class="card__btn" data-id="${t._id}">
            Start
            <svg class="card__btn-arrow" width="16" height="16">
              <use href="./img/sprite.svg#icon-arrow"></use>
            </svg>
          </button>
        </div>

        <div class="card__wrap-title">
          <div class="card__title-svg">
            <svg width="20" height="20">
              <use href="./img/sprite.svg#icon-food-24-filled"></use>
            </svg>
          </div>
          <h3 class="card__title">${t.name}</h3>
        </div>

              <div class="card__block-info">
                <p class="card__text-info">
                  <span>Burned calories:</span>${a} / ${r} min
                </p>
                ${s?`<p class="card__text-info"><span>Body part:</span>${s}</p>`:""}
                ${i?`<p class="card__text-info"><span>Target:</span>${i}</p>`:""}
              </div>
      </div>
    </li>
  `}function it(){return v==="Muscles"?"muscles":v==="Body parts"?"bodypart":v==="Equipment"?"equipment":"muscles"}document.addEventListener("click",t=>{if(t.target.classList.contains("exercises-title__base--link")){d=null,l="",u=1,m="categories",p();return}const e=t.target.closest(".filters__item");!e||!e.dataset.category||(d=e.dataset.category,u=1,l="",m="exercises",p())});function nt(t){v=t,d=null,l="",u=1,m="categories",p()}function H(t){d&&(l=t.trim().toLowerCase(),u=1,m="exercises",p())}function N(t){u=t,p()}const j=document.querySelector(".search");function ot(t,e=500){let a;return(...r)=>{clearTimeout(a),a=setTimeout(()=>t(...r),e)}}function ct(){if(!j)return;const t=ot(e=>{const a=e.target.value.trim().toLowerCase();if(!a){H("");return}a.length<2||H(a)},600);j.addEventListener("input",t)}const K="favorites";function lt(t){try{const e=JSON.parse(t);return Array.isArray(e)?e:[]}catch{return[]}}function L(){const t=localStorage.getItem(K)||"[]";return lt(t).filter(e=>e&&e._id)}function dt(t){localStorage.setItem(K,JSON.stringify(t)),window.dispatchEvent(new CustomEvent("favorites:changed",{detail:{favorites:t}}))}function ut(t){return t?L().some(e=>e._id===t):!1}function ft(t){if(!t||!t._id)return{favorites:L(),isFavorite:!1};const e=L(),a=e.some(s=>s._id===t._id),r=a?e.filter(s=>s._id!==t._id):[...e,t];return dt(r),{favorites:r,isFavorite:!a}}let n=null,_=null,h=null;function mt(){n=document.createElement("div"),n.className="modal-overlay",n.style.display="none",document.body.appendChild(n),document.addEventListener("click",async t=>{if(t.target.classList.contains("card__btn")){const a=t.target.dataset.id;await B(a);return}const e=t.target.closest(".exercise-card-item[data-id]");if(e){const a=e.dataset.id;a&&await B(a)}}),n.addEventListener("click",t=>{(t.target===n||t.target.classList.contains("modal__close"))&&P(),t.target.classList.contains("modal__give-rating")&&pt();const e=t.target.closest&&t.target.closest(".modal__add-favorite");if(e&&_){const{isFavorite:a}=ft(_);e.dataset.action=a?"remove":"add",e.innerHTML=`
        ${a?"Remove from favorites":"Add to favorites"}
        <span class="modal__fav-icon" aria-hidden="true">${a?"♥":"♡"}</span>
      `}}),n.addEventListener("submit",async t=>{t.target.classList.contains("rating-form")&&(t.preventDefault(),await gt(t.target))}),document.addEventListener("keydown",t=>{t.key==="Escape"&&n.style.display==="flex"&&P()}),h=document.createElement("div"),h.className="toast-container",document.body.appendChild(h)}async function B(t){try{const e=await G(t);_=e;const a=ut(e==null?void 0:e._id);n.innerHTML=`
      <div class="modal">
        <button class="modal__close">&times;</button>
        
        <div class="modal__content">
          <div class="modal__image">
            ${e.gifUrl?`<img src="${e.gifUrl}" alt="${e.name}" loading="lazy" />`:""}
          </div>
          
          <div class="modal__info">
            <h2 class="modal__title">${e.name}</h2>
            
            <div class="modal__rating-display">
              <span class="modal__rating-value">${e.rating}</span>
              <div class="modal__stars">
                ${_t(e.rating)}
              </div>
            </div>
            
            <div class="modal__details">
              <div class="modal__detail">
                <span class="modal__detail-label">Target</span>
                <span class="modal__detail-value">${e.target}</span>
              </div>
              <div class="modal__detail">
                <span class="modal__detail-label">Body Part</span>
                <span class="modal__detail-value">${e.bodyPart}</span>
              </div>
              <div class="modal__detail">
                <span class="modal__detail-label">Equipment</span>
                <span class="modal__detail-value">${e.equipment}</span>
              </div>
              <div class="modal__detail">
                <span class="modal__detail-label">Popular</span>
                <span class="modal__detail-value">${e.popularity||"N/A"}</span>
              </div>
              <div class="modal__detail">
                <span class="modal__detail-label">Burned Calories</span>
                <span class="modal__detail-value">${e.burnedCalories} /${e.time} min</span>
              </div>
            </div>
            
            <p class="modal__description">${e.description||""}</p>
            
            <div class="modal__actions">
              <button class="modal__add-favorite" data-action="${a?"remove":"add"}">
                ${a?"Remove from favorites":"Add to favorites"}
                <span class="modal__fav-icon" aria-hidden="true">${a?"♥":"♡"}</span>
              </button>
              <button class="modal__give-rating">
                Give a rating
              </button>
            </div>
          </div>
        </div>
      </div>
    `,n.style.display="flex",document.body.style.overflow="hidden"}catch{M("Could not load exercise details")}}function pt(){if(!_)return;n.innerHTML=`
    <div class="modal modal--rating">
      <button class="modal__close">&times;</button>
      
      <h3 class="modal__rating-title">Rating</h3>
      
      <form class="rating-form" data-id="${_._id}">
        <div class="rating-stars">
          <span class="rating-value">0.0</span>
          <div class="rating-stars-input">
            <input type="radio" name="rate" value="1" id="star1" required>
            <label for="star1">☆</label>
            <input type="radio" name="rate" value="2" id="star2">
            <label for="star2">☆</label>
            <input type="radio" name="rate" value="3" id="star3">
            <label for="star3">☆</label>
            <input type="radio" name="rate" value="4" id="star4">
            <label for="star4">☆</label>
            <input type="radio" name="rate" value="5" id="star5">
            <label for="star5">☆</label>
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
  `;const t=n.querySelectorAll('input[name="rate"]'),e=n.querySelector(".rating-value");t.forEach(a=>{a.addEventListener("change",r=>{e.textContent=`${r.target.value}.0`})})}function _t(t){const e=Math.floor(t),a=t%1>=.5,r=5-e-(a?1:0);let s="";for(let i=0;i<e;i++)s+="★";a&&(s+="⯨");for(let i=0;i<r;i++)s+="☆";return s}async function gt(t){const e=new FormData(t),a=t.dataset.id;try{await Q(a,{rate:Number(e.get("rate")),email:e.get("email"),review:e.get("review")||""}),M("Thank you for your rating!"),P()}catch{M("Failed to submit rating. Please try again.")}}function P(){n&&(n.style.display="none",document.body.style.overflow="",_=null)}function M(t){if(!h)return;const e=document.createElement("div");e.className="toast",e.textContent=t,h.appendChild(e),requestAnimationFrame(()=>{e.classList.add("toast--visible")}),window.setTimeout(()=>{e.classList.remove("toast--visible"),window.setTimeout(()=>e.remove(),250)},2200)}const R=document.querySelector(".footer-form"),I=document.querySelector(".footer-input");function vt(){R&&R.addEventListener("submit",async t=>{t.preventDefault();const e=I.value.trim();if(!e){alert("Please enter your email");return}try{await Y(e),alert("Successfully subscribed!"),I.value=""}catch{alert("Subscription failed. Please try again.")}})}const y=document.querySelector(".favorites__list.js-list");y&&(U(L()),window.addEventListener("favorites:changed",t=>{var a;const e=((a=t.detail)==null?void 0:a.favorites)||[];U(e)}));function U(t){if(y){if(!t.length){y.innerHTML=`
      <li class="favorites__empty">
        It appears that you haven't added any exercises to your favorites yet. To get started, you can add exercises that you like to your favorites for easier access in the future.
      </li>
    `;return}y.innerHTML=t.map(e=>{const a=(e.rating||0).toFixed(2),r=e.burnedCalories??"--",s=e.time??"--",i=e.bodyPart||"",f=e.target||"";return`
          <li class="fav-filters__item-card exercise-card-item" data-id="${e._id}">
            <div class="card__wrap">
              <div class="card__block-btn">
                <span class="card__badge">WORKOUT</span>
                <span class="card__rating">
                  ${a}
                  <svg class="card__rating-star" width="18" height="18">
                    <use href="./img/sprite.svg#icon-star-rating"></use>
                  </svg>
                </span>
                <button class="card__btn" data-id="${e._id}">
                  Start
                  <svg class="card__btn-arrow" width="16" height="16">
                    <use href="./img/sprite.svg#icon-arrow"></use>
                  </svg>
                </button>
              </div>

              <div class="card__wrap-title">
                <div class="card__title-svg">
                  <svg width="20" height="20">
                    <use href="./img/sprite.svg#icon-food-24-filled"></use>
                  </svg>
                </div>
                <h3 class="card__title">${e.name}</h3>
              </div>

              <div class="card__block-info">
                <p class="card__text-info">
                  <span>Burned calories:</span>${r} / ${s} min
                </p>
                ${i?`<p class="card__text-info"><span>Body part:</span>${i}</p>`:""}
                ${f?`<p class="card__text-info"><span>Target:</span>${f}</p>`:""}
              </div>
            </div>
          </li>
        `}).join("")}}function ht(){V(),X(t=>{nt(t)}),p(),ct(),Z(),mt(),vt()}ht();
//# sourceMappingURL=main-BFN-i17G.js.map
