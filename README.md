# Продивинутый курс по React + Redux + Redux toolkit + Typescript 
https://www.youtube.com/watch?v=Od5H_CiU2vM 

npx create-react-app . --template-typescript 

Устанавливаем redux toolkit 

https://redux-toolkit.js.org/introduction/getting-started 

# Redux + Plain JS template
npx create-react-app my-app --template redux

# Redux + TypeScript template
npx create-react-app my-app --template redux-typescript 


An Existing App​
Redux Toolkit is available as a package on NPM for use with a module bundler or in a Node application:

# NPM
npm install @reduxjs/toolkit

УСТАНАВЛИВАЕМ В ПРИЛОЖЕНИЕ
npm install @reduxjs/toolkit react-redux @types/react-redux

ошибка 
Could not find a declaration file for module 'react/jsx-runtime' 
 

решение 
npm i --save-dev @types/react 

https://github.com/facebook/create-react-app/issues/10109 


### СОЗДАЕМ ФАЙЛОВУЮ СТРУКТУРУ ДЛЯ СТОРА 
папка store -> store.ts 

store -> reducers 


### store.js 
import {combineReducers} from '@reduxjs/toolkit';

const rootReducer = combineReducers({

})


КОГДА ИСПОЛЬЗУЕМ REDUX TOOLKIT, НАМ НЕ НУЖНО ПОДКЛЮЧАТЬ ИНСТРУМЕНТЫ РАЗРАБОТЧИКА REDUX ДЛЯ ОТЛАДКИ, И ТАКЖЕ НЕТ НУЖДЫ ПОДКЛЮЧАТЬ REDUX-THUNK MIDDLEWARE, ПОСКОЛЬКУ ВСЕ РАБОТАЕТ ИЗ КОРОБКИ 

папка hooks
hooks -> redux.ts 

содержимое файла redux.ts 
import { AppDispatch, RootState } from './../store/store';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;



!!! ПРИ ИСПОЛЬЗОВАНИИ ОБЫЧНОГО СЕЛЕКТОРА useSelector мы не знаем, что внутри, а при использовании типизированного useAppSelector  - знаем, автокомплит подсказывает 

будет подхватываться тип, а также все редюсеры и все поля 


СОЗДАЕМ REDUCER 

reducers -> UserSlice.ts 


в REDUX TOOLKIT естть слайсы - это обертка над редюсерами которая добавляет дополнительный функционал 


создаем папку models 
models -> User.ts 


Redux БЕЗ TOOLKIT: 
return {...state, field: action.payload}

Redux Toolkit 
state.field = action.payload 

Redux без toolkit 
return {
...state,
object: {
...state.object,
field: action.payload 
 }
} 


REDUX TOOLKIT 

state.object.field = action.payload 


асинхронные запросы создаются в actionCreator
reducers -> ActionCreator.ts 

данные получаем с сервера JSONplaceholder 
https://jsonplaceholder.typicode.com/ 


## УСТАНАВЛИВАЕМ AXIOS 
### npm install axios 


нужно обработать три ситуации - сам запрос, индикация его заргузки, и ошибку 

userSlice.ts 

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from './../models/User';

interface UserState {
    users: IUser[];
    isLoading: boolean;
    error: string;
    count: number;
}


const initialState: UserState = {
    users: [],
    isLoading: false,
    error: '',
    count: 0
}


// создаем slice 
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        increment(state, action: PayloadAction<number>) {
            state.count += action.payload;
        },
        userFetching(state) {
            state.isLoading = true;
        },
        userFetchingSuccess(state, action: PayloadAction<IUser[]>) {
            state.isLoading = false;
            state.error = '';
            state.users = action.payload;
        },
        userFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false; 
            state.error = action.payload;
        }
    }
})

export default userSlice.reducer;


RTK QUERY 

services -> UserService.ts 

https://github.com/utimur/redux_toolkit_rtk_query/blob/master/src/services/PostService.ts 



ПРИ ДУБЛИРОВАНИИ КОМПОНЕНТОВ МОЖНО НЕ ЗАБОТИТЬСЯ О ТОМ, ЧТО ЗАППРОСЫ ПРОДУБДИРУЮТСЯ. ЗАПРОС БУДЕТ ТОЛЬКО ОДИН 

ЛИШНИЙ ЗАПРОС ВЫПОЛНЯТЬСЯ НЕ БУДЕТ - МЫ ВОЗЬМЕМ ЭТИ ДАННЫЕ ИЗ ХРАНИЛИЩА 

RTK QUERY ПОЗАБОТИТСЯ О ТОМ, ЧТОБЫ ЭТИ ДАННЫЕ ЗАКЕШИРОВАТЬ И ОБНОВИТЬ 

Кэширование данных очень полезно при выпадающих списках 

RTK QUERY 
функция refetch - для перезаписи данных 

можно делать long Polling 
dв чатах, в уаедомлениях 
pollingInterval: 1000 

  const [limit, setLimit] = useState(10);
    const {data: posts, error, isLoading, refetch} = postAPI.useFetchAllPostsQuery(limit, {
        pollingInterval: 1000
    })


pollingInterval - это аналог вебсокетов 



### УСТАНОВИМ JSON SERVER 

npm install -g json-server 


https://github.com/typicode/json-server 


json-server --watch db.json -- port 5000
Now if you go to http://localhost:3000/posts/1, you'll get


как базоывый URl указываем localhost 


RTK query - обработка ошибок, обработка индикации загрузок 
при этом данные кешируются 
RTK query проверяет, чтобы они были актуальными 
