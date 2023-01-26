import React, { FC } from 'react';

interface descProp {
  title: string,
  editMarket: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Description: FC<descProp> = (props): JSX.Element => {  
  return (
    <div>
      <div className="form-group col-sm">
          <label htmlFor="description">{props.title}</label>
          <textarea className="form-control" id="description" onChange={props.editMarket}/>
        </div>
    </div>
  );
}