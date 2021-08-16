import { createReducer, on } from '@ngrx/store';
import {crear, toggle, editar, borrar, toggleAll, limpiarCompletados} from './todos.actions';
import { Todo } from "./models/todo.mode";

export const estadoInicial:Todo[] = [
  new Todo('Salvar al mundo'),
  new Todo('Vencer a thanos'),
  new Todo('Comprar traje de Ironman'),
  new Todo('Robar escudo del capitan america')
];

const _todoReducer = createReducer(
  estadoInicial,
  on(crear, (state, { texto } ) => [ ...state, new Todo(texto)] ),
  on(borrar, (state, { id } ) => state.filter( todo => todo.id!==id ) ),
  on(toggleAll, (state, { toggle } ) => {
    return state.map( todo=>{
        return {
          ...todo,
          completado: toggle
        }
    });
  } ),
  on(toggle, (state, { id } ) => {
    return state.map( todo=>{
      if(todo.id === id){
        return {
          ...todo,
          completado: !todo.completado
        }
      }
      else{
        return todo;
      }
    });
  } ),
  on(editar, (state, { id, texto } ) => {
    return state.map( todo=>{
      if(todo.id === id){
        return {
          ...todo,
          texto: texto
        }
      }
      else{
        return todo;
      }
    });
  } ),
  on(limpiarCompletados, (state) => state.filter( todo => !todo.completado ) ),
);

export function todoReducer(state:any, action:any) {
  return _todoReducer(state, action);
}
