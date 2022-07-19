// Simple building blocks.
const brackets = '[]';
const parens   = '()';
const curlies  = '{}';
const negative = '!' ;
const over     = '/' ;
const minus    = '-' ;
const plus     = '+' ;
const arrow    = '=>';

// Auxliiar functions
const surround  = (content) => `(${content})`;
const get       = (obj, at) => surround(`${surround(obj)}[${surround(at)}]`)
const negate    = (content) => surround(`${negative}${content}`);
const as_number = (content) => surround(`${plus}${content}`);
const as_string = (content) => surround(`${brackets}${plus}${surround(content)}`);
const apply     = (a, r, b) => surround(`${a}${r}${b}`)
const call      = (fn, arg) => surround(`${fn}${surround(arg)}`)

// Complex building blocks.
const False    = negate(brackets);
const True     = negate(False);
const nan      = as_number(curlies);
const zero     = as_number(brackets);
const one      = as_number(True);
const infinity = apply(True, over, zero)
const string   = as_string(brackets);

// Auxiliar numeral function.
const numeral = n => n == 0 
                   ? zero 
                   : Array.from({ length: n }, _ => one).join('+')
                   ;

// Start procedure to get letters of method names.
const dictionary = {};

// Auxiliar string building function.
const __from_string = string => string.split('').map(c => dictionary[c]).join(plus)

// Some letters gathered from the complex building blocks.
dictionary.a = get( as_string(nan     ) , numeral(1) );
dictionary.b = get( as_string(curlies ) , numeral(2) );
dictionary.c = get( as_string(curlies ) , numeral(5) );
dictionary.o = get( as_string(curlies ) , numeral(1) );
dictionary.t = get( as_string(True    ) , numeral(0) );
dictionary.r = get( as_string(True    ) , numeral(1) );
dictionary.u = get( as_string(True    ) , numeral(2) );
dictionary.e = get( as_string(True    ) , numeral(3) );
dictionary.n = get( as_string(infinity) , numeral(1) );
dictionary.i = get( as_string(infinity) , numeral(3) );
dictionary.f = get( as_string(False   ) , numeral(0) );
dictionary.s = get( as_string(False   ) , numeral(3) );

// We also need spaces
dictionary[' '] = get(as_string(curlies), numeral(7));

// Just for convenience.
const constructor = __from_string("constructor");

// More letters, these ones being harder to get.
dictionary.g = get( as_string(get( as_string(brackets)      , as_string(constructor))), numeral(14) );
dictionary.S = get( as_string(get( as_string(brackets)      , as_string(constructor))), numeral(9)  );
dictionary.p = get( as_string(get( apply(over, minus, over) , as_string(constructor))), numeral(14));

// Need an escaped backslash to use in `escape` method.
dictionary['\\'] = get(as_string(/\\\\/), numeral(1))

// Just for convenience.
const to_string = __from_string("toString");

// More letter, just as hard as g, S and p.
dictionary.d = call( get(numeral(13), as_string(to_string)), numeral(14) );
dictionary.h = call( get(numeral(17), as_string(to_string)), numeral(18) );
dictionary.m = call( get(numeral(22), as_string(to_string)), numeral(23) );

// Building blocks for functions.
const fun      = surround(`${parens}${arrow}${curlies}`);
const fun_c    = get(fun, as_string(constructor));
const decl_fun = (body) => call(fun_c, body);

// Building a function to return the escape method.
const escaped = call(decl_fun(as_string(__from_string('return escape'))), string);

// Finally, escaping the backslash gives us the uppercase C.
dictionary.C = get(call(escaped, dictionary['\\']), numeral(2));

// Just for convenience.
const from_char_code = __from_string("fromCharCode")

// Make the prime version of the __from_string function, now being able to get every character possible.
const from_string = (str) =>
    str.split('').map(char => 
        call(get(get(string, as_string(constructor)), as_string(from_char_code)), numeral(char.charCodeAt(0)))
    ).join('+')

// Make a compiling function to compile normal JS code to this monstruosity.
const compile = (code) => call(decl_fun(as_string(from_string(code))), string);