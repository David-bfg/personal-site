color(red).
color(green).
color(orange).
color(blue).
color(magenta).
color(yellow).
color(brown).
color(purple).

master(A,B,C,D):-color(A),color(B),color(C),color(D),validate([A,B,C,D]).

validate(A):-known(K),validate(A,K).
validate(A,[X|Y]):-check(A,X),validate(A,Y).
validate(_,[]).

check(A,[E,F,G,H,O,S]):-same(A,[E,F,G,H],X),X=S,col-exist(A,[E,F,G,H],Y),O=Y.

col-exist([H|T],X,V):-exist(H,X,Y,AV),col-exist(T,Y,V1),V is AV+V1.
col-exist([],_,0).

exist(X,[H|T],[H|Y],V):-X\=H,exist(X,T,Y,V).
exist(X,[H|T],T,1):-X=H.
exist(_,[],[],0).

same([H|T],[X|Y],V):-H\=X,same(T,Y,P),P=V.
same([H|T],[X|Y],V):-H=X,same(T,Y,P),V is P+1.
same([],[],0).

known(K):-K=[
[purple,orange,blue,yellow,1,0],
[red,brown,green,magenta,1,1]].

