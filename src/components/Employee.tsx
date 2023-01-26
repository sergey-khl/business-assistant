import React, { FC } from 'react';

interface empProp {
  editEmp: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  deleteEmp: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Employee: FC<empProp> = (props): JSX.Element => {
  
  return (
    <div className='container bg-light'>
      <div className='row'>
        <div className="form-group col-sm">
          <label htmlFor="name">Employee Name</label>
          <input type="text" className="form-control" id="name" onChange={props.editEmp}/>
        </div>
        <div className="form-group col-sm">
          <label htmlFor="title">Title/Role</label>
          <input type="text" className="form-control" id="title" onChange={props.editEmp}/>
        </div>
        <div className="form-group col-sm">
          <label htmlFor="background">Background</label>
          <textarea className="form-control" id="background" onChange={props.editEmp}/>
        </div>
        <button type="button" className="btn btn-outline-secondary btn-lg col-sm m-4" onClick={props.deleteEmp}>Remove Employee</button>
      </div>
      
    </div>
  );
}