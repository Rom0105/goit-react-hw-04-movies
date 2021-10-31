import style from '../OnBack/OnBack.module.css';
function OnBack({ onBack }) {
  return (
    <button className={style.button} type="button" onClick={onBack}>
      Go back
    </button>
  );
}

export default OnBack;
