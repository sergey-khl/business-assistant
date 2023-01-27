import React, { useState , FC } from 'react';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { Product } from './Product';
import { Employee } from './Employee';
import { Description } from './Description';
import ReactMarkdown from 'react-markdown'

type Prod = {
  id: number;
  productName: string;
  productPrice: number;
  productDescription: string;
}

type Emp = {
  id: number;
  employeeName: string;
  employeeTitleOrRole: string;
  employeeBackground: string;
}

type Marketing = {
  id: number;
  promotionStrategyName: string;
  promotionStrategyImplementationDescription: string;
}

type Bus = {
  businessPlan: string;
  pitch: string;
}

export const Business: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [otherIndustry, setOtherIndustry] = useState<string>("");
  const [funding, setFunding] = useState<number>(0);
  // const [startDate, setStartDate] = useState(new Date());
  const [structure, setStructure] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [unique, setUnique] = useState<string>("");
  const [numCustomers, setNumCustomers] = useState<number>(0);
  const [spend, setSpend] = useState<number>(0);
  const [customer, setCustomer] = useState<string>("");
  const [products, setProducts] = useState<Prod[]>([]);
  const [prodId, setProdId] = useState<number>(0);
  const [marketing, setMarketing] = useState<Marketing[]>([]);
  const [markId, setMarkId] = useState<number>(0);
  const [team, setTeam] = useState<Emp[]>([]);
  const [teamId, setTeamId] = useState<number>(0);
  const [prompt, setPrompt] = useState<string>("");
  const [businessPlan, setBusinessPLan] = useState<Bus>({businessPlan: "", pitch: ""});

  // const prompt = `
  //   Fill in [MASK] with the most probable option. Anything in () is a list of possible options for the value in that key value pair. Anything in <> is a type description for the value in that key value pair. 
  //   Output the key value pairs then provide a unique Business Plan using all of the following key value pairs: 
  //   {"companyName": ${(name ? name : "[MASK]")}, 
  //   "industry": ${(industry === 'Other' ? otherIndustry : (industry ? industry : "[MASK]"))}(Arts & Entertainment, Automotive, Bar & Nightclub, Beauty/Hair Salon & Day Spa, Business Services, Construction & Engineering, Consulting, Consumer Services, Day Care Services & Children's Products, Education & Training, Farm & Food Production, Fashion/Décor, Finance/Insurance, Fitness & Sports, Hotel & Bed and Breakfast, Information Technology, Manufacturing, Medical & Health Care, Non Profit, Pet Services & Pet Supllies, Real Estate, Retail or Online Store, Restaurant, Cafe & Bakery, Transportation, Wedding & Event Planning, Wholesale & Distributor), 
  //   "amountOfFunding": ${(funding ? funding : "[MASK]")}, 
  //   "legalStructure": ${(structure ? structure : "[MASK]")}(C Corporation, S Corporation, Limited Liability Company), 
  //   "description": ${(description ? description : "[MASK]")}, 
  //   "whyChooseUs": ${(unique ? unique : "[MASK]")}, 
  //   "numberOfCustomers": ${(numCustomers ? numCustomers : "[MASK]")}, 
  //   "spendingOfCustomerPerYear": ${(spend ? spend : "[MASK]")}, 
  //   "targetCustomers": ${(customer ? customer : "[MASK]")}, 
  //   "products": [${(products.map(prod => (prod.productName ?  JSON.stringify(prod, replaceId) : "[MASK]")))}]<productName: string, priceOfProduct: number, descriptionOfProduct: string>, 
  //   "marketing": [${(marketing.map(mark => (mark.promotionStrategyName ?  JSON.stringify(mark, replaceId) : "[MASK]")))}]<promotionStrategyName: string, promotionStrategyImplementationDescription: string>, 
  //   "team": [${(team.map(mem => (mem.employeeName ?  JSON.stringify(mem, replaceId) : "[MASK]")))}]<employeeName: string, employeeTitleOrRole: string, employeeBackground: string>}
  //   `;

  const handleInput = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>): void => {
    setter(e.target.value);
  }

  const handleOtherIndustry = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setOtherIndustry(e.target.value);
  }

  const handleIndustry = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setIndustry(e.target.value);
  }

  const handleLegal = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setStructure(e.target.value);
  }

  const handleDesc = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setter(e.target.value);
  }

  const onlyNum = (setter: React.Dispatch<React.SetStateAction<number>>) => (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value === "" || /^[0-9\b]{1,17}$/.test(e.target.value)) {
      setter(+e.target.value);
    }
  }

  const addProduct = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setProducts([...products, {id: prodId, productName: "", productPrice: 0, productDescription: ""}])
    setProdId(prodId + 1);
  }

  const editProduct = (id: number) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const newProducts: Prod[] = products;
    newProducts.map(prod => {
      if (prod.id === id) {
        if (e.target.id === 'productName') {
          prod.productName = e.target.value;
        } else if (e.target.id === 'productPrice') {
          prod.productPrice = +e.target.value;
        } else if (e.target.id === 'productDescription') {
          prod.productDescription = e.target.value;
        }
      }
      return prod;
    });

    setProducts(newProducts)
  }

  const deleteProduct = (id: number) => (e: React.MouseEvent<HTMLButtonElement>): void => {
    setProducts(products.filter(prod => prod.id !== id));
  }

  const handleMarket = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.checked) {
      setMarketing([...marketing, {id: markId, promotionStrategyName: e.target.value, promotionStrategyImplementationDescription: ""}]);
      setMarkId(markId + 1);
    } else {
      setMarketing(marketing.filter(mark => mark.promotionStrategyName !== e.target.value));
    }
  }

  const editMarket = (id: number) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const newMareting: Marketing[] = marketing;
    newMareting.map(mark => {
      if (mark.id === id) {
        mark.promotionStrategyImplementationDescription = e.target.value;
      }
      return mark;
    });

    setMarketing(newMareting);
  }

  const addEmp = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setTeam([...team, {id: teamId, employeeName: "", employeeTitleOrRole: "", employeeBackground: ""}])
    setTeamId(teamId + 1);
  }

  const editEmp = (id: number) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const newTeam: Emp[] = team;
    newTeam.map(team => {
      if (team.id === id) {
        if (e.target.id === 'name') {
          team.employeeName = e.target.value;
        } else if (e.target.id === 'title') {
          team.employeeTitleOrRole = e.target.value;
        } else if (e.target.id === 'background') {
          team.employeeBackground = e.target.value;
        }
      }
      return team;
    });

    setTeam(newTeam);
  }

  const deleteEmp = (id: number) => (e: React.MouseEvent<HTMLButtonElement>): void => {
    setTeam(team.filter(team => team.id !== id));
  }

  const replaceId = (key: string, value: any) => {
    if (key === "id") {
      return undefined;
    } else {
      return value
    }
  }

  async function sendPrompt(e: any) {
    e.preventDefault();
    setLoading(true);
    const prompt = `
    Generate key value pairs that will be used to create a unique business plan for a successful company. Fill in [MASK] with the most probable option. Anything in () is a list of possible options for the value in that key value pair. Anything in <> is a type description for the value in that key value pair. 
    Fill in the following key value pairs if information is missing using what is already filled in: 
    {"companyName": ${(name ? name : "[MASK]")}, 
    "industry": ${(industry === 'Other' ? otherIndustry : (industry ? industry : "[MASK]"))}(Arts & Entertainment, Automotive, Bar & Nightclub, Beauty/Hair Salon & Day Spa, Business Services, Construction & Engineering, Consulting, Consumer Services, Day Care Services & Children's Products, Education & Training, Farm & Food Production, Fashion/Décor, Finance/Insurance, Fitness & Sports, Hotel & Bed and Breakfast, Information Technology, Manufacturing, Medical & Health Care, Non Profit, Pet Services & Pet Supllies, Real Estate, Retail or Online Store, Restaurant, Cafe & Bakery, Transportation, Wedding & Event Planning, Wholesale & Distributor), 
    "amountOfFunding": ${(funding ? funding : "[MASK]")}, 
    "legalStructure": ${(structure ? structure : "[MASK]")}(C Corporation, S Corporation, Limited Liability Company), 
    "description": ${(description ? description : "[MASK]")}, 
    "whyChooseUs": ${(unique ? unique : "[MASK]")}, 
    "numberOfCustomers": ${(numCustomers ? numCustomers : "[MASK]")}, 
    "spendingOfCustomerPerYear": ${(spend ? spend : "[MASK]")}, 
    "targetCustomers": ${(customer ? customer : "[MASK]")}, 
    "products": [${(products.map(prod => (prod.productName ?  JSON.stringify(prod, replaceId) : "[MASK]")))}]<productName: string, priceOfProduct: number, descriptionOfProduct: string>, 
    "marketing": [${(marketing.map(mark => (mark.promotionStrategyName ?  JSON.stringify(mark, replaceId) : "[MASK]")))}]<promotionStrategyName: string, promotionStrategyImplementationDescription: string>, 
    "team": [${(team.map(mem => (mem.employeeName ?  JSON.stringify(mem, replaceId) : "[MASK]")))}]<employeeName: string, employeeTitleOrRole: string, employeeBackground: string>}
    `;
    setPrompt(prompt);
    try {
        const request = await fetch("http://localhost:5000/api/prompt", {
            method: "POST",
            body: JSON.stringify({
                prompt,
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        const data = await request.json();
        if (data.message) {
            setLoading(false);
            //👇🏻 update the state with the server response
            setBusinessPLan(data.result);
            
        }
    } catch (err) {
        console.log('nope')
        console.error(err);
    }
  }

  return (
    <div>
      <h1>All sections are optional and can be generated by the AI!</h1>
      <h2>Add information to get a personalized Business Plan.</h2>
      <form>
        <div>
          <h3>Overview</h3>
          <div className="form-group">
            <label htmlFor="companyName">Company Name</label>
            <input type="text" className="form-control" value={name} id="companyName" onChange={handleInput(setName)}/>
          </div>
          <div className="form-group">
            <label htmlFor="industry">Industry</label>
            <select className="form-control" id="industry" onChange={handleIndustry}>
              <option>Choose...</option>
              <option>Arts & Entertainment</option>
              <option>Automotive</option>
              <option>Bar & Nightclub</option>
              <option>Beauty/Hair Salon & Day Spa</option>
              <option>Business Services</option>
              <option>Construction & Engineering</option>
              <option>Consulting</option>
              <option>Consumer Services</option>
              <option>Day Care Services & Children's Products</option>
              <option>Education & Training</option>
              <option>Farm & Food Production</option>
              <option>Fashion/Décor</option>
              <option>Finance/Insurance</option>
              <option>Fitness & Sports</option>
              <option>Hotel & Bed and Breakfast</option>
              <option>Information Technology</option>
              <option>Manufacturing</option>
              <option>Medical & Health Care</option>
              <option>Non Profit</option>
              <option>Pet Services & Pet Supllies</option>
              <option>Real Estate</option>
              <option>Retail or Online Store</option>
              <option>Restaurant, Cafe & Bakery</option>
              <option>Transportation</option>
              <option>Wedding & Event Planning</option>
              <option>Wholesale & Distributor</option>
              <option>Other</option>
            </select>
            {industry === "Other" && <input type="text" className="form-control" id="otherIndustry" value={otherIndustry} onChange={handleOtherIndustry}/>}
          </div>
          <div className="form-group">
            <label htmlFor="funding">How much funding are you looking for? (enter 0 for no funding)</label>
            <input type="text" className="form-control" id="funding" value={funding} onChange={onlyNum(setFunding)}/>
          </div>
          <div>
            {/* <h5>Is this a new company?</h5>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="notNew"/>
              <label className="form-check-label" htmlFor="notNew">
                no
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="isNew"/>
              <label className="form-check-label" htmlFor="isNew" >
                yes
              </label>
            </div>
            <div className='form-group'>
              <label htmlFor="date">Company Start Date</label>
              <DatePicker id="date" selected={startDate} onChange={(date:Date) => setStartDate(date)} />
            </div> */}
            <div className="form-group">
              <label htmlFor="legal">Legal Structure</label>
              <select className="form-control" id="legal" onChange={handleLegal}>
                <option selected>Choose...</option>
                <option>C Corporation</option>
                <option>S Corporation</option>
                <option>Limited Liability Company</option>
                <option>Sole Proprietorship</option>
                <option>Non-Profit Organization</option>
                <option>Not Yet Incorporated</option>
              </select>
            </div>
          </div>
        </div>
        
        <div>
          <h3>Executive Summary</h3>
          <div className="form-group">
            <label htmlFor="description">What does your company do or offer?</label>
            <textarea className="form-control" id="description" value={description} onChange={handleDesc(setDescription)}/>
          </div>
          <div className="form-group">
            <label htmlFor="unique">What makes your company unique (cheaper, more efficient, etc)?</label>
            <textarea className="form-control" id="unique" value={unique} onChange={handleDesc(setUnique)}/>
          </div>
        </div>

        <div>
          <h3>Market</h3>
          <div className="form-group">
            <label htmlFor="numCustomers">How many customers do you expect this year?</label>
            <input type="text" className="form-control" id="numCustomers" value={numCustomers} onChange={onlyNum(setNumCustomers)}/>
          </div>
          <div className="form-group">
            <label htmlFor="earnCustomers">How much do you expect each customer will spend this year?</label>
            <input type="text" className="form-control" id="earnCustomers" value={spend} onChange={onlyNum(setSpend)}/>
          </div>
          <div className="form-group">
            <label htmlFor="targetCustomers">Target Customers</label>
            <input type="text" className="form-control" id="targetCustomers" value={customer} onChange={handleInput(setCustomer)}/>
          </div>
        </div>

        <div>
          <h3>Products (add but leave empty if you want AI to replace it)</h3>
          <>
            {products.map(prod => {
              return <Product key={prod.id} editProduct={editProduct(prod.id)} deleteProduct={deleteProduct(prod.id)}></Product>
            })}
          </>
          <button type="button" className="btn btn-secondary" onClick={addProduct}>Add Product</button>
          <div className='row'>
            <div className='col-sm'>
              <h3>How Will You Market?</h3>
              <div className='form-group'>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="Content(Blogs, Videos, etc)" id="content" onChange={handleMarket}/>
                  <label className="form-check-label" htmlFor="content">Content(Blogs, Videos, etc)</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="Social Media" id="social" onChange={handleMarket}/>
                  <label className="form-check-label" htmlFor="social">Social Media</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="Search Engine(SEO, PPC, SEM)" id="seo" onChange={handleMarket}/>
                  <label className="form-check-label" htmlFor="seo">Search Engine(SEO, PPC, SEM)</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="Public Relations" id="pr" onChange={handleMarket}/>
                  <label className="form-check-label" htmlFor="pr">Public Relations</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="Print(Newspapers, Magazines, etc)" id="print" onChange={handleMarket}/>
                  <label className="form-check-label" htmlFor="print">Print(Newspapers, Magazines, etc)</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="Direct Mail" id="direct" onChange={handleMarket}/>
                  <label className="form-check-label" htmlFor="direct">Direct Mail</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="Email" id="email" onChange={handleMarket}/>
                  <label className="form-check-label" htmlFor="email">Email</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="Television & Radio" id="tv" onChange={handleMarket}/>
                  <label className="form-check-label" htmlFor="tv">Television & Radio</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="Other" id="other" onChange={handleMarket}/>
                  <label className="form-check-label" htmlFor="other">Other</label>
                </div>
              </div>
            </div>
            <div className='col-sm'>
              <h3>Describe Your Strategy</h3>
              <>
                {marketing.map(market => {
                  return <Description title={market.promotionStrategyName} key={market.id} editMarket={editMarket(market.id)}></Description>
                })}
              </>
            </div>
          </div>
        </div>
        
        <div>
          <h3>Team</h3>
          <>
            {team.map(mem => {
              return <Employee key={mem.id} editEmp={editEmp(mem.id)} deleteEmp={deleteEmp(mem.id)}></Employee>
            })}
          </>
          <button type="button" className="btn btn-secondary" onClick={addEmp}>Add Member</button>
        </div>
        
        <button type="submit" className="btn btn-primary" onClick={sendPrompt}>Generate Business Plan!</button>
      </form>
      <div className='bg-secondary'>
        <p>{prompt}</p>
      </div>
      
      {loading && <div className='loading'>
          <h1>Loading, please wait...</h1>
      </div>}
      <div className='bg-success'>
        <ReactMarkdown>{businessPlan.businessPlan}</ReactMarkdown>
      </div>
      <div className='bg-info'>
        <ReactMarkdown>{businessPlan.pitch}</ReactMarkdown>
      </div>
    </div>
  );
}