import PropTypes from 'prop-types';

export function HistoryDisplay({ history }) {
  return (
    <div className="p-4 bg-zinc-800 rounded-lg">
      <h2 className="text-lg font-bold mb-2">Histórico</h2>
      <ul>
        {history.map((item, index) => (
          <li className="font-normal text-3xl font-mono" key={index}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

HistoryDisplay.propTypes = {
  history: PropTypes.array.isRequired,
};
