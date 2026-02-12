(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const h of r.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&s(h)}).observe(document,{childList:!0,subtree:!0});function a(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=a(i);fetch(i.href,r)}})();const T="https://your-energy.b.goit.study/api";async function Lt(){const t=await fetch(`${T}/quote`);if(!t.ok)throw new Error("Failed to fetch quote");return t.json()}async function $t({filter:t,page:e=1,limit:a=10}={}){if(!t)throw new Error("Filter is required");const s=new URLSearchParams({filter:t,page:String(e),limit:String(a)}),i=await fetch(`${T}/filters?${s}`);if(!i.ok)throw new Error("Failed to fetch filters");return i.json()}async function xt(t){const e=new URLSearchParams;Object.entries(t).forEach(([s,i])=>{i!=null&&i!==""&&e.append(s,i)});const a=await fetch(`${T}/exercises?${e.toString()}`);if(!a.ok)throw new Error("Failed to fetch exercises");return a.json()}async function St(t){if(!t)throw new Error("Exercise id is required");const e=await fetch(`${T}/exercises/${t}`);if(!e.ok)throw new Error("Failed to fetch exercise");return e.json()}async function Tt(t,{rate:e,email:a,review:s}){const i=await fetch(`${T}/exercises/${t}/rating`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({rate:e,email:a,review:s})});if(!i.ok)throw new Error("Failed to rate exercise");return i.json()}async function Mt(t){const e=await fetch(`${T}/subscription`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t})});if(!e.ok){let a="Failed to subscribe";try{const i=await e.json();i!=null&&i.message&&(a=i.message)}catch{}const s=new Error(a);throw s.status=e.status,s}return e.json()}const K=document.querySelectorAll(".quote__container p, .favorite-quote__wrapper p"),z=document.querySelectorAll(".quote__author-name"),Pt="The only bad workout is the one that didn’t happen.",st="Unknown";async function qt(){if(!(!K.length||!z.length))try{const t=await Lt();if(!t||!t.quote)throw new Error("Empty quote");K.forEach(e=>{e.textContent=t.quote}),z.forEach(e=>{e.textContent=t.author||st})}catch{K.forEach(e=>{e.textContent=Pt}),z.forEach(e=>{e.textContent=st})}}const V=document.querySelector(".exersices__list");let it="Muscles",G=null;function At(t){V&&(G=t,V.addEventListener("click",e=>{const a=e.target.closest(".btnFilters");a&&(V.querySelectorAll(".btnFilters").forEach(s=>s.classList.remove("active")),a.classList.add("active"),it=a.textContent.trim(),G&&G(it))}))}const R=document.querySelector(".exercises__pagination");let c=1,E=1;function Ft(){R&&R.addEventListener("click",t=>{const e=t.target.closest("button[data-direction]");if(!e)return;const a=e.dataset.direction;if(a==="prev"&&c>1){c-=1,ot(c),Q();return}a==="next"&&c<E&&(c+=1,ot(c),Q())})}function j(t,e){c=Number.isFinite(t)?t:1,E=Number.isFinite(e)&&e>0?e:1,c>E&&(c=E),Q()}function Q(){R&&(R.innerHTML=`
    <button type="button" data-direction="prev" ${c===1?"disabled":""} aria-label="Previous page">&lt;</button>
    <span>${c} / ${E}</span>
    <button type="button" data-direction="next" ${c===E?"disabled":""} aria-label="Next page">&gt;</button>
  `)}const u=document.querySelector(".filters__list.js-list"),L=document.querySelector(".search__form"),M=document.querySelector(".search__input"),U=document.querySelector(".search__button"),Y=document.querySelector(".exersices__title"),vt="(max-width: 767px)",Ct=9,kt=12;let f=1,P="Muscles",m="",v=null,g="categories",W=window.matchMedia(vt).matches,rt=null;function It(){L&&(L.classList.remove("hidden"),L.setAttribute("aria-hidden","false"),M&&(M.disabled=!1),U&&(U.disabled=!1))}function Nt(){L&&(L.classList.add("hidden"),L.setAttribute("aria-hidden","true"),M&&(M.value="",M.disabled=!0),U&&(U.disabled=!0),m="")}function et(){if(Y){if(g==="exercises"&&v){Y.innerHTML=`
      <button type="button" class="exercises-title__base exercises-title__base--link">
        Exercises
      </button>
      <span class="exercises-title__slash">/</span>
      <span class="exercises-title__current">${v}</span>
    `;return}Y.textContent="Exercises"}}function ht(){return W?Ct:kt}function H(t){u&&(u.innerHTML=`
    <li class="filters__state">${t}</li>
  `)}async function y(){u&&(et(),g==="categories"?await Bt():await Ot())}async function Bt(){Nt(),et(),u&&u.classList.remove("filters__list--exercises");try{const t=await $t({filter:P,page:f,limit:ht()}),e=t.results||[];if(!e.length){H("No categories found for this filter."),j(1,1);return}u.innerHTML=e.map(a=>`
        <li class="filters__item" data-category="${a.name}">
          <img class="filters__img-first" src="${a.imgURL}" alt="${a.name}" />
          <div class="filters__wrapper-first">
            <h3 class="filters__title-first">${a.name}</h3>
            <p class="filters__text-first">${a.filter}</p>
          </div>
        </li>
      `).join(""),j(f,t.totalPages||1)}catch(t){console.error(t),H("Unable to load categories. Please try again.")}}async function Ot(){if(v){It(),et(),u&&u.classList.add("filters__list--exercises");try{const t={page:f,limit:ht()},e=jt();t[e]=v,m&&m.length>=2&&(t.keyword=m);const a=await xt(t),s=a.results||[];if(!s.length){H("No exercises found for this request."),j(1,1);return}u.innerHTML=s.map(i=>Rt(i)).join(""),j(f,a.totalPages||1)}catch(t){console.error(t),H("Unable to load exercises. Please try again.")}}}function Rt(t){const e=(t.rating||0).toFixed(2),a=t.burnedCalories??"--",s=t.time??"--",i=t.bodyPart||"",r=t.target||"";return`
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
          <button class="card__btn" type="button" data-id="${t._id}">
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
                  <span>Burned calories:</span>${a} / ${s} min
                </p>
                ${i?`<p class="card__text-info"><span>Body part:</span>${i}</p>`:""}
                ${r?`<p class="card__text-info"><span>Target:</span>${r}</p>`:""}
              </div>
      </div>
    </li>
  `}function jt(){return P==="Muscles"?"muscles":P==="Body parts"?"bodypart":P==="Equipment"?"equipment":"muscles"}document.addEventListener("click",t=>{if(t.target.classList.contains("exercises-title__base--link")){v=null,m="",f=1,g="categories",y();return}const e=t.target.closest(".filters__item[data-category]");!e||!e.dataset.category||g!=="categories"||(v=e.dataset.category,f=1,m="",g="exercises",y())});function Ut(t){P=t,v=null,m="",f=1,g="categories",y()}function nt(t){if(!v||g!=="exercises")return;const e=t.trim().toLowerCase();e!==m&&(m=e,f=1,g="exercises",y())}function ot(t){!Number.isFinite(t)||t<1||(f=t,y())}function Ht(){const t=window.matchMedia(vt).matches;t!==W&&(W=t,f=1,y())}u&&window.addEventListener("resize",()=>{window.clearTimeout(rt),rt=window.setTimeout(Ht,150)});const B=document.querySelector(".search"),ct=document.querySelector(".search__form"),lt=document.querySelector(".search__button");function Dt(t,e=300){let a;return(...s)=>{window.clearTimeout(a),a=window.setTimeout(()=>t(...s),e)}}function Kt(){if(!B)return;const t=a=>{const s=a.trim().toLowerCase();if(!s||s.length<2){nt("");return}nt(s)};ct&&ct.addEventListener("submit",a=>{a.preventDefault(),t(B.value)}),lt&&lt.addEventListener("click",()=>{t(B.value)});const e=Dt(a=>{t(a.target.value)});B.addEventListener("input",e)}const bt="favorites";function zt(t){try{const e=JSON.parse(t);return Array.isArray(e)?e:[]}catch{return[]}}function $(){const t=localStorage.getItem(bt)||"[]";return zt(t).filter(e=>e&&e._id)}function yt(t){localStorage.setItem(bt,JSON.stringify(t)),window.dispatchEvent(new CustomEvent("favorites:changed",{detail:{favorites:t}}))}function Vt(t){return t?$().some(e=>e._id===t):!1}function Gt(t){if(!t)return $();const a=$().filter(s=>s._id!==t);return yt(a),a}function Yt(t){if(!t||!t._id)return{favorites:$(),isFavorite:!1};const e=$(),a=e.some(i=>i._id===t._id),s=a?e.filter(i=>i._id!==t._id):[...e,t];return yt(s),{favorites:s,isFavorite:!a}}let n=null,x=null,q=null;function wt(t){return t?"&#9829;":"&#9825;"}function Jt(){n=document.createElement("div"),n.className="modal-overlay",n.style.display="none",document.body.appendChild(n),document.addEventListener("click",async t=>{const e=t.target.closest(".card__btn[data-id]");if(e){await dt(e.dataset.id);return}const a=t.target.closest(".exercise-card-item[data-id]");a&&await dt(a.dataset.id)}),n.addEventListener("click",t=>{if(t.target===n||t.target.closest(".modal__close")){X();return}if(t.target.closest(".modal__give-rating")){Qt();return}const e=t.target.closest(".modal__add-favorite");if(e&&x){const{isFavorite:a}=Yt(x);e.dataset.action=a?"remove":"add",e.innerHTML=`
        ${a?"Remove from favorites":"Add to favorites"}
        <span class="modal__fav-icon" aria-hidden="true">${wt(a)}</span>
      `}}),n.addEventListener("submit",async t=>{t.target.classList.contains("rating-form")&&(t.preventDefault(),await Xt(t.target))}),document.addEventListener("keydown",t=>{t.key==="Escape"&&n.style.display==="flex"&&X()}),q=document.createElement("div"),q.className="toast-container",document.body.appendChild(q)}async function dt(t){if(t)try{const e=await St(t);x=e;const a=Vt(e==null?void 0:e._id),s=Number((e==null?void 0:e.rating)||0).toFixed(1);n.innerHTML=`
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
                ${Wt(e.rating)}
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
                <span class="modal__fav-icon" aria-hidden="true">${wt(a)}</span>
              </button>
              <button type="button" class="modal__give-rating">Give a rating</button>
            </div>
          </div>
        </div>
      </div>
    `,n.style.display="flex",document.body.style.overflow="hidden"}catch{Z("Could not load exercise details")}}function Qt(){if(!x)return;n.innerHTML=`
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
  `;const t=n.querySelectorAll('input[name="rate"]'),e=n.querySelector(".rating-value");t.forEach(a=>{a.addEventListener("change",s=>{e.textContent=`${s.target.value}.0`})})}function Wt(t){const e=Number(t)||0,a=Math.min(Math.max(e,0),5),s=Math.floor(a),i=a-s,r=i>=.25&&i<.75,h=i>=.75?s+1:s;let w="";for(let _=0;_<5;_+=1){if(_<h&&(!r||_<s)){w+=`
        <span class="modal__star modal__star--full" aria-hidden="true">
          <svg width="18" height="18">
            <use href="./img/sprite.svg#icon-star-rating"></use>
          </svg>
        </span>
      `;continue}if(_===s&&r){w+=`
        <span class="modal__star modal__star--half" aria-hidden="true">
          <svg class="modal__star-base" width="18" height="18">
            <use href="./img/sprite.svg#icon-star-rating"></use>
          </svg>
          <svg class="modal__star-fill" width="18" height="18">
            <use href="./img/sprite.svg#icon-star-rating"></use>
          </svg>
        </span>
      `;continue}w+=`
      <span class="modal__star modal__star--empty" aria-hidden="true">
        <svg width="18" height="18">
          <use href="./img/sprite.svg#icon-star-rating"></use>
        </svg>
      </span>
    `}return w}async function Xt(t){const e=new FormData(t),a=t.dataset.id;try{await Tt(a,{rate:Number(e.get("rate")),email:e.get("email"),review:e.get("review")||""}),Z("Thank you for your rating!"),X()}catch{Z("Failed to submit rating. Please try again.")}}function X(){n&&(n.style.display="none",document.body.style.overflow="",x=null)}function Z(t){if(!q)return;const e=document.createElement("div");e.className="toast",e.textContent=t,q.appendChild(e),requestAnimationFrame(()=>{e.classList.add("toast--visible")}),window.setTimeout(()=>{e.classList.remove("toast--visible"),window.setTimeout(()=>e.remove(),250)},2200)}const A=document.querySelector(".footer-form"),l=document.querySelector(".footer-input"),J=document.querySelector("#subscribeBtn"),Zt=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;function te(){return A?A.querySelector(".footer-form__status"):null}function F(t,e){const a=te();a&&(a.textContent=t,a.className="footer-form__status",e&&a.classList.add(`is-${e}`))}function ee(){F("","")}function ut(t){l&&(l.classList.add("is-invalid"),l.setAttribute("aria-invalid","true"),F(t,"error"))}function ft(){l&&(l.classList.remove("is-invalid"),l.removeAttribute("aria-invalid"))}function mt(t){J&&(J.disabled=t,J.textContent=t?"Sending...":"Send"),l&&(l.disabled=t)}function ae(t){return Zt.test(t)}function se(t){return(t==null?void 0:t.status)===409?"This email is already subscribed.":(t==null?void 0:t.status)===400?"Please provide a valid email address.":"Subscription failed. Please try again later."}function ie(){!A||!l||(l.addEventListener("input",()=>{ft(),ee()}),A.addEventListener("submit",async t=>{t.preventDefault();const e=l.value.trim().toLowerCase();if(!e){ut("Please enter your email.");return}if(!l.checkValidity()||!ae(e)){ut("Please enter a valid email address.");return}ft(),F("Sending subscription...","pending"),mt(!0);try{await Mt(e),A.reset(),F("Thanks! You are subscribed.","success")}catch(a){F(se(a),"error")}finally{mt(!1)}}))}const S=document.querySelector("[data-menu-open-btn]"),_t=document.querySelector("[data-menu-close-btn]"),p=document.querySelector("[data-menu-backdrop]"),I=document.querySelector(".js-menu-container"),re=document.querySelectorAll(".mobile-menu__nav-link");function ne(){!p||!I||!S||(p.classList.remove("is-hidden"),I.classList.add("is-open"),document.body.classList.add("no-scroll"),S.setAttribute("aria-expanded","true"))}function O(){!p||!I||!S||(I.classList.remove("is-open"),p.classList.add("is-hidden"),document.body.classList.remove("no-scroll"),S.setAttribute("aria-expanded","false"))}function oe(){!S||!_t||!p||!I||(S.addEventListener("click",ne),_t.addEventListener("click",O),p.addEventListener("click",t=>{t.target===p&&O()}),document.addEventListener("keydown",t=>{t.key==="Escape"&&!p.classList.contains("is-hidden")&&O()}),re.forEach(t=>{t.addEventListener("click",O)}))}const C=document.querySelector(".favorites__list.js-list"),b=document.querySelector(".js-favorites-pagination"),Et="(max-width: 767px)",ce=8,le=10;let o=1,d=[],tt=window.matchMedia(Et).matches,pt=null;C&&(d=$(),k(d),window.addEventListener("favorites:changed",t=>{var s;const e=((s=t.detail)==null?void 0:s.favorites)||[];d=Array.isArray(e)?e:[];const a=N(d.length);o>a&&(o=a),k(e)}),C.addEventListener("click",t=>{var i;const e=t.target.closest(".fav-card__delete");if(!e)return;t.preventDefault(),t.stopPropagation();const a=e.closest(".exercise-card-item[data-id]"),s=(i=a==null?void 0:a.dataset)==null?void 0:i.id;s&&Gt(s)}),window.addEventListener("resize",()=>{window.clearTimeout(pt),pt=window.setTimeout(()=>{const t=window.matchMedia(Et).matches;if(t===tt)return;tt=t;const e=N(d.length);o>e&&(o=e),k(d)},150)}));b&&b.addEventListener("click",t=>{const e=t.target.closest("button[data-direction]");if(!e)return;const a=N(d.length),s=e.dataset.direction;if(s==="prev"&&o>1){o-=1,k(d);return}s==="next"&&o<a&&(o+=1,k(d))});function k(t){if(!C)return;const e=Array.isArray(t)?t:[];if(d=e,!e.length){o=1,C.innerHTML=`
      <li class="favorites__empty">
        It appears that you haven't added any exercises to your favorites yet. To get started, you can add exercises that you like to your favorites for easier access in the future.
      </li>
    `,gt(0);return}const a=N(e.length);o>a&&(o=a);const s=(o-1)*D(),i=e.slice(s,s+D());C.innerHTML=i.map(r=>{const h=r.burnedCalories??"--",w=r.time??"--",_=r.bodyPart||"",at=r.target||"";return`
        <li class="fav-filters__item-card exercise-card-item" data-id="${r._id}">
          <div class="card__wrap">
            <div class="card__block-btn">
              <div class="fav-card__meta">
                <span class="card__badge">WORKOUT</span>
                <button class="fav-card__delete" type="button" aria-label="Remove from favorites" title="Remove from favorites">
                  <img class="fav-card__delete-icon" src="./img/svg/trash-icon.svg" alt="" aria-hidden="true" />
                </button>
              </div>

              <button class="card__btn" type="button" data-id="${r._id}">
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
              <h3 class="card__title">${r.name}</h3>
            </div>

            <div class="card__block-info">
              <p class="card__text-info">
                <span>Burned calories:</span>${h} / ${w} min
              </p>
              ${_?`<p class="card__text-info"><span>Body part:</span>${_}</p>`:""}
              ${at?`<p class="card__text-info"><span>Target:</span>${at}</p>`:""}
            </div>
          </div>
        </li>
      `}).join(""),gt(e.length)}function D(){return tt?ce:le}function N(t){return t?Math.max(1,Math.ceil(t/D())):1}function gt(t){if(!b)return;const e=N(t);if(t<=D()){b.innerHTML="",b.classList.add("hidden");return}b.classList.remove("hidden"),b.innerHTML=`
    <button type="button" data-direction="prev" ${o===1?"disabled":""} aria-label="Previous favorites page">&lt;</button>
    <span>${o} / ${e}</span>
    <button type="button" data-direction="next" ${o===e?"disabled":""} aria-label="Next favorites page">&gt;</button>
  `}function de(){qt(),At(t=>{Ut(t)}),y(),Kt(),Ft(),Jt(),ie(),oe()}de();
//# sourceMappingURL=main-842OJ0dw.js.map
