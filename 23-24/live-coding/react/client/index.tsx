import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import { OrderedMap } from "immutable"

export const main = () => {
  const rootElement = document.querySelector("#root")
  if (!rootElement) { alert("nooooooo"); return }
  const root = createRoot(rootElement)
  const products:Array<Product> = [
    {
      id:`product-01`,
      title:`Fiat Panda`,
      description:`This is the car that will get you and your stuff there and back, but without comfort nor dignity.`,
      image:`https://www.classicdriver.com/cdn-cgi/image/format=auto,fit=cover,width=1920,height=1029/sites/default/files/users/173526/cars_images/173526-927269-car-20220831_164433-bildschirmfoto_2022-08-31_um_16.38.03.jpg`,
    },
    {
      id:`product-02`,
      title:`Fiat 500`,
      description:`Like a Panda, but kind of cute and if you play your cards right might actually help with dating.`,
      image:`https://www.fiat.nl/content/dam/fiat/com/my23/new-la-prima/model-range/figurini/New500-Boceli-Module-Range-Figurini_Cabrio.png`,
    },
    {
      id:`product-03`,
      title:`Dodge Ram`,
      description:`What they say...big car, small...`,
      image:`https://media-cdn.vwe.nl/Images/129198931?templateid=0&overlay=&bgc=f5f5f5`,
    }]


  root.render(
    <>
      <Products initialProducts={products} />
    </>
  )
}

type Updater<s> = (_:s) => s

type ProductsProps = { initialProducts:Array<Product> }
type ProductsState = { products:OrderedMap<Product["id"], Product> }
const ProductState = {
  Default:(initialProducts:Array<Product>) : ProductsState => ({ products:OrderedMap(initialProducts.map(_ => ([_.id, _] as [Product["id"], Product]))) }),
  Updaters:{
    removeProduct:(productId:Product["id"]) : Updater<ProductsState> =>
      state => state.products.count() <= 1 ? state : {...state, products:state.products.remove(productId)},
    addNewProduct:() : Updater<ProductsState> => {
      const id = `product-${Math.random()}${Math.random()}${Math.random()}`
      return state => ({...state, products:state.products.set(id, { id, title:"new product", description:"", image:"" })})
    }
  }
}

const Products = (props:ProductsProps) => {
  const [state, setState] = useState<ProductsState>(ProductState.Default(props.initialProducts))

  return <>
      {
        state.products.map(product =>
          <Product 
            product={product}
            requestProductDelete={() => setState(ProductState.Updaters.removeProduct(product.id))}
            width={400}
          />
        ).valueSeq()
      }
      <button onClick={() => setState(ProductState.Updaters.addNewProduct()) }>🚗</button>
  </>
}


// Product.ts
type Product = { id:string, title:string, description:string, image:string }

// ProductComponent.tsx
type ProductProps = { product:Product, width:number, requestProductDelete:() => void }
const Product = (props:ProductProps) =>
  <>
    <h1>{props.product.title}</h1>
    <p>{props.product.description}</p>
    <img style={{ width:`${props.width}px` }} src={props.product.image} />
    <button onClick={() => props.requestProductDelete()}>🗑️</button>
  </>






// export type Identifiable = { id: string; };

// export type Fun<A, B> = (_: A) => B;
// export type Updater<Entity> = Fun<Entity, Entity>;

// export type Widening<Entity, FieldKey extends keyof Entity> = Fun<Updater<Entity[FieldKey]>, Updater<Entity>>;
// export type SimpleUpdater<Entity, FieldKey extends keyof Entity> = {
//   [f in FieldKey]: Widening<Entity, f>;
// };
// export const simpleUpdater = <Entity,>() => <FieldKey extends keyof Entity>(field: FieldKey): SimpleUpdater<Entity, FieldKey> => ({
//   [field]: (fieldUpdater: Updater<Entity[FieldKey]>): Updater<Entity> => currentEntity => ({...currentEntity, [field]: fieldUpdater(currentEntity[field]) })
// }) as unknown as SimpleUpdater<Entity, FieldKey>;


// type CardState = Identifiable & { name:string, description:string }
// const CardState = {
//   Default:(id:CardState["id"]) : CardState => ({
//     id, name:"", description:""
//   }),
//   Updaters:{
//     ...simpleUpdater<CardState>()("id"),
//     ...simpleUpdater<CardState>()("name"),
//     ...simpleUpdater<CardState>()("description"),
//   }
// }

// const then = <s,>(f:Updater<s>, g:Updater<s>) : Updater<s> => s0 => g(f(s0))

// const replaceNameWithJim = CardState.Updaters.name(_ => "Jim")
// const addDr = CardState.Updaters.name(_ => `Dr. ${_}`)
// const callMeDrJim = then(replaceNameWithJim, addDr) // horizontal composition of updaters
// console.log(callMeDrJim(CardState.Default("123")))

// type DashboardState = {
//   mode:"dark" | "light"
//   cards:Immutable.Map<CardState["id"], CardState>
// }

// const DashboardState = {
//   Default:() : DashboardState => ({
//     mode:"light",
//     cards:Immutable.Map([["card-1", CardState.Default("card-1")], ["card-2", CardState.Default("card-2")]])
//   }),
//   Updaters:{
//     ...simpleUpdater<DashboardState>()("mode"),
//     ...simpleUpdater<DashboardState>()("cards"),
//     card:(cardId:CardState["id"]) => (cardUpdater:Updater<CardState>) : Updater<DashboardState> =>
//       current => 
//         !current.cards.has(cardId) ? current
//         : DashboardState.Updaters.cards(cards => cards.set(cardId, cardUpdater(cards.get(cardId)!)))(current)
//   }
// }

// // vertical composition
// const addDrToCard2:Updater<DashboardState> = DashboardState.Updaters.card("card-2")(addDr)
// console.log(addDrToCard2(DashboardState.Default()))



/*
- async
- not live coding: .Net and TS/Rx integration
*/