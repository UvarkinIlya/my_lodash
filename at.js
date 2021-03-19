function is_separator(elem){
  let separators = [']', '[', '.'];

  for(let i = 0; i < separators.length; i++){
      if(separators[i] == elem){
          return true;
      }
  }

  return false;
}

function split_str(obj, str){
  str = String(str);

  let sub_str;
  let pointer = 0;

  for(let i = 0; i < str.length; i++){
      if( is_separator(str[i]) ){
          sub_str = str.slice(pointer, i);
          pointer = i + 1;
          if(sub_str == ""){
              continue;
          }
          obj = obj[sub_str];
          if(obj == undefined){
            return undefined;
          }
      }
  }

  sub_str = str.slice(pointer, str.length);
  if(sub_str != "" || typeof(obj) == "object"){
    obj = obj[sub_str];
  }

  return obj;
}

function at(obj, ...paths){
  let out_arr = [];

  if(paths.length == 0){
    return [];
  }

  if((paths.length == 1 && Array.isArray(paths[0])) || typeof(paths[0]?.callee) =='function'){
    paths = paths[0];
  }

  let temp_obj;
  for(path of paths){
      temp_obj = _.cloneDeep(obj);
      temp_obj = temp_obj?.length == 0 ? obj : temp_obj;
      if(typeof(temp_obj) == "string" || typeof(temp_obj) == "undefined" || temp_obj == null){
        temp_obj = {};
      }
      if( Array.isArray(path) ){
        continue;
      }

      if( typeof(path) == "string"){
          out_arr.push(split_str(temp_obj, path));
      }else{
          out_arr.push( temp_obj[path] );
      }
      
  }

  return out_arr;
}