import React, { useState, FC } from 'react';

interface prodProp {
  editProduct: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  deleteProduct: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Product: FC<prodProp> = (props): JSX.Element => {
  const [spend, setSpend] = useState<number>(0);

  const onlyNum = (setter: React.Dispatch<React.SetStateAction<number>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "" || /^[0-9\b]{1,17}$/.test(e.target.value)) {
      setter(+e.target.value);
      props.editProduct(e);
    }
  }

  return (
    <div className='container bg-light'>
      <div className='row'>
        <div className="form-group col-sm">
          <label htmlFor="productName">Product Name</label>
          <input type="text" className="form-control" id="productName" onChange={props.editProduct}/>
        </div>
        <div className="form-group col-sm">
          <label htmlFor="productPrice">Price of Product</label>
          <input type="text" className="form-control" id="productPrice" value={spend} onChange={onlyNum(setSpend)}/>
        </div>
        <div className="form-group col-sm">
          <label htmlFor="productDescription">Description/Benefits</label>
          <textarea className="form-control" id="productDescription" onChange={props.editProduct}/>
        </div>
        <button type="button" className="btn btn-outline-secondary btn-lg col-sm m-4" onClick={props.deleteProduct}>Remove Product</button>
      </div>
    </div>
  );
}