import React from 'react';

const Calculator = ({
  value,
  onInput,
  onOperation,
  onCalculate,
  onClear,
  onClose,
  onMemoryAdd,
  onMemoryRecall,
  onMemoryClear,
}) => {
  // Button layout for a standard calculator
  const buttons = [
    ['C', '/', '*', '-'],
    [7, 8, 9, '+'],
    [4, 5, 6, '('],
    [1, 2, 3, ')'],
    [0, '.', '=', '%'],
    ['M+', 'MR', 'MC', 'Close'],
  ];

  // Helper to handle button clicks
  const handleButtonClick = (item) => {
    if (item === 'C') return onClear();
    if (item === '=') return onCalculate();
    if (item === 'M+') return onMemoryAdd && onMemoryAdd();
    if (item === 'MR') return onMemoryRecall && onMemoryRecall();
    if (item === 'MC') return onMemoryClear && onMemoryClear();
    if (item === 'Close') return onClose();
    if (typeof item === 'number' || item === '.') return onInput(item.toString());
    return onOperation(item);
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        background: 'rgba(0,0,0,0.2)',
        zIndex: 1050,
      }}
    >
      <div
        className="bg-white rounded shadow-lg"
        style={{
          width: 340,
          maxWidth: '95vw',
          padding: 0,
        }}
      >
        <div className="bg-primary text-white p-3 d-flex justify-content-between align-items-center rounded-top">
          <h3 className="h6 mb-0">Calculator</h3>
          <button className="btn-close btn-close-white" onClick={onClose}></button>
        </div>
        <div className="p-3 bg-light">
          <input
            type="text"
            className="form-control form-control-lg text-end border-0 bg-white"
            value={value}
            readOnly
            style={{ fontSize: 28, height: 48 }}
          />
        </div>
        <div className="p-2">
          {buttons.map((row, i) => (
            <div className="row g-1 mb-1" key={i}>
              {row.map((item) => (
                <div className="col-3" key={item}>
                  <button
                    className={`btn w-100 ${
                      item === '='
                        ? 'btn-primary'
                        : item === 'Close'
                        ? 'btn-danger'
                        : ['M+', 'MR', 'MC'].includes(item)
                        ? 'btn-warning'
                        : 'btn-light'
                    }`}
                    style={{
                      fontWeight: 500,
                      fontSize: 18,
                      minHeight: 44,
                    }}
                    onClick={() => handleButtonClick(item)}
                  >
                    {item}
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;