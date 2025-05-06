import React from 'react';
import {ClickAwayListener} from "@mui/material";

const ConfirmationPanel = ({heading, body, confirmFn, cancelFn}: {
  heading: string;
  body: string;
  confirmFn: () => void;
  cancelFn: () => void;
}) => {
  return (
    <ClickAwayListener onClickAway={cancelFn}>
      <div className="bg-background max-w-96 w-full rounded-md shadow-md flex flex-col overflow-hidden">
        <div className="flex flex-col gap-4 p-4">
          <h2 className="text-accent font-semibold tracking-wide text-3xl">{heading}</h2>
          <p>{body}</p>
        </div>

        <div className="bg-background-secondary flex items-center justify-end p-4 gap-4">
          <button type="button" className="hover:text-gray-400 text-gray-500 cursor-pointer" onClick={cancelFn}>Cancel</button>
          <button className="submit-btn3" onClick={confirmFn}>Confirm</button>
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default ConfirmationPanel;