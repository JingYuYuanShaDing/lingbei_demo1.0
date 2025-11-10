const searchText = document.getElementById('search-text');
const filterEra = document.getElementById('filter-era');
const filterMaterial = document.getElementById('filter-material');
const searchBtn = document.getElementById('search-btn');
const resetBtn = document.getElementById('reset-btn');
const relicsList = document.getElementById('relics-list');
const countEl = document.getElementById('count');
function collectItems()
{
  return Array.from(document.querySelectorAll('.relic'));
}
function updateCount(n)
{
  countEl.textContent = String(n);
}
function matches(item, kw, era, material)
{
  const name = item.getAttribute('data-name') || '';
  const e = item.getAttribute('data-era') || '';
  const m = item.getAttribute('data-material') || '';
  const text = (name + ' ' + e + ' ' + m).toLowerCase();
  if(kw && text.indexOf(kw) === -1)
  {
    return false;
  }
  if(era && e.toLowerCase() !== era)
  {
    return false;
  }
  if(material && m.toLowerCase() !== material)
  {
    return false;
  }
  return true;
}
function runSearch()
{
  const kw = searchText.value.trim().toLowerCase();
  const era = filterEra.value.trim().toLowerCase();
  const material = filterMaterial.value.trim().toLowerCase();
  const items = collectItems();
  let shown = 0;
  items.forEach(item=>{
    if(matches(item, kw, era, material))
    {
      item.style.display = '';
      shown++;
    }
    else
    {
      item.style.display = 'none';
    }
  });
  updateCount(shown);
}
function resetFilters()
{
  searchText.value = '';
  filterEra.value = '';
  filterMaterial.value = '';
  runSearch();
}
function bindSearch()
{
  searchBtn.addEventListener('click', function(){
    runSearch();
  });
  resetBtn.addEventListener('click', function(){
    resetFilters();
  });
  searchText.addEventListener('keydown', function(e){
    if(e.key === 'Enter')
    {
      runSearch();
    }
  });
}
function bindToggleDetails()
{
  relicsList.addEventListener('click', function(e){
    const btn = e.target.closest('.toggle-detail');
    if(!btn) return;
    const relic = btn.closest('.relic');
    const detail = relic.querySelector('.relic-detail');
    const opened = detail.style.display === 'flex';
    document.querySelectorAll('.relic-detail').forEach(d=>d.style.display = 'none');
    if(opened)
    {
      detail.style.display = 'none';
    }
    else
    {
      detail.style.display = 'flex';
      detail.scrollIntoView({behavior:'smooth', block:'center'});
    }
  });
}
function bindModelInteraction()
{
  let active = null;
  let startX = 0;
  let startY = 0;
  let rotX = -18;
  let rotY = 12;
  relicsList.addEventListener('pointerdown', function(e){
    const view = e.target.closest('.model-view');
    if(!view) return;
    view.setPointerCapture(e.pointerId);
    active = view.querySelector('.cube');
    startX = e.clientX;
    startY = e.clientY;
    view.addEventListener('pointermove', onMove);
    view.addEventListener('pointerup', onUp);
    view.addEventListener('pointercancel', onUp);
  });
  function onMove(e)
  {
    if(!active) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const ny = rotY + dx * 0.2;
    const nx = rotX - dy * 0.2;
    active.style.transform = 'rotateX(' + nx + 'deg) rotateY(' + ny + 'deg)';
  }
  function onUp(e)
  {
    if(!active) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    rotY = rotY + dx * 0.2;
    rotX = rotX - dy * 0.2;
    active.style.transform = 'rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)';
    const view = e.target.closest('.model-view');
    if(view)
    {
      view.removeEventListener('pointermove', onMove);
      view.removeEventListener('pointerup', onUp);
      view.removeEventListener('pointercancel', onUp);
    }
    active = null;
  }
  relicsList.addEventListener('click', function(e){
    const btn = e.target.closest('.model-rotate');
    if(!btn) return;
    const action = btn.getAttribute('data-action');
    const view = btn.closest('.relic-detail').querySelector('.model-view');
    const cube = view.querySelector('.cube');
    if(action === 'auto')
    {
      cube.style.transition = 'transform 8000ms linear';
      cube.style.transform = 'rotateX(-18deg) rotateY(372deg)';
      setTimeout(function(){
        cube.style.transition = '';
      }, 8200);
    }
    if(action === 'stop')
    {
      const style = window.getComputedStyle(cube);
      cube.style.transition = '';
      const matrix = style.transform;
      if(matrix && matrix !== 'none')
      {
        cube.style.transform = matrix;
      }
    }
  });
}
window.addEventListener('DOMContentLoaded', function(){
  runSearch();
  bindSearch();
  bindToggleDetails();
  bindModelInteraction();
});
