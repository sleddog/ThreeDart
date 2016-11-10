(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
return y.__proto__&&y.__proto__.p===z.prototype.p}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b){"use strict"
function generateAccessor(a9,b0,b1){var g=a9.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var c
if(g.length>1)c=true
else c=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a0=d&3
var a1=d>>2
var a2=f=f.substring(0,e-1)
var a3=f.indexOf(":")
if(a3>0){a2=f.substring(0,a3)
f=f.substring(a3+1)}if(a0){var a4=a0&2?"r":""
var a5=a0&1?"this":"r"
var a6="return "+a5+"."+f
var a7=b1+".prototype.g"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}if(a1){var a4=a1&2?"r,v":"v"
var a5=a1&1?"this":"r"
var a6=a5+"."+f+"=v"
var a7=b1+".prototype.s"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}}return f}function defineClass(a2,a3){var g=[]
var f="function "+a2+"("
var e=""
var d=""
for(var c=0;c<a3.length;c++){if(c!=0)f+=", "
var a0=generateAccessor(a3[c],g,a2)
d+="'"+a0+"',"
var a1="p_"+a0
f+=a1
e+="this."+a0+" = "+a1+";\n"}if(supportsDirectProtoAccess)e+="this."+"$deferredAction"+"();"
f+=") {\n"+e+"}\n"
f+=a2+".builtin$cls=\""+a2+"\";\n"
f+="$desc=$collectedClasses."+a2+"[1];\n"
f+=a2+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a2+".name=\""+a2+"\";\n"
f+=a2+"."+"$__fields__"+"=["+d+"];\n"
f+=g.join("")
return f}init.createNewIsolate=function(){return new I()}
init.classIdExtractor=function(c){return c.constructor.name}
init.classFieldsExtractor=function(c){var g=c.constructor.$__fields__
if(!g)return[]
var f=[]
f.length=g.length
for(var e=0;e<g.length;e++)f[e]=c[g[e]]
return f}
init.instanceFromClassId=function(c){return new init.allClasses[c]()}
init.initializeEmptyInstance=function(c,d,e){init.allClasses[c].apply(d,e)
return d}
var z=supportsDirectProtoAccess?function(c,d){var g=c.prototype
g.__proto__=d.prototype
g.constructor=c
g["$is"+c.name]=c
return convertToFastObject(g)}:function(){function tmp(){}return function(a0,a1){tmp.prototype=a1.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a0.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var c=e[d]
g[c]=f[c]}g["$is"+a0.name]=a0
g.constructor=a0
a0.prototype=g
return g}}()
function finishClasses(a4){var g=init.allClasses
a4.combinedConstructorFunction+="return [\n"+a4.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a4.combinedConstructorFunction)(a4.collected)
a4.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.name
var a0=a4.collected[c]
var a1=a0[0]
a0=a0[1]
g[c]=d
a1[c]=d}f=null
var a2=init.finishedClasses
function finishClass(c1){if(a2[c1])return
a2[c1]=true
var a5=a4.pending[c1]
if(a5&&a5.indexOf("+")>0){var a6=a5.split("+")
a5=a6[0]
var a7=a6[1]
finishClass(a7)
var a8=g[a7]
var a9=a8.prototype
var b0=g[c1].prototype
var b1=Object.keys(a9)
for(var b2=0;b2<b1.length;b2++){var b3=b1[b2]
if(!u.call(b0,b3))b0[b3]=a9[b3]}}if(!a5||typeof a5!="string"){var b4=g[c1]
var b5=b4.prototype
b5.constructor=b4
b5.$isb=b4
b5.$deferredAction=function(){}
return}finishClass(a5)
var b6=g[a5]
if(!b6)b6=existingIsolateProperties[a5]
var b4=g[c1]
var b5=z(b4,b6)
if(a9)b5.$deferredAction=mixinDeferredActionHelper(a9,b5)
if(Object.prototype.hasOwnProperty.call(b5,"%")){var b7=b5["%"].split(";")
if(b7[0]){var b8=b7[0].split("|")
for(var b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=true}}if(b7[1]){b8=b7[1].split("|")
if(b7[2]){var b9=b7[2].split("|")
for(var b2=0;b2<b9.length;b2++){var c0=g[b9[b2]]
c0.$nativeSuperclassTag=b8[0]}}for(b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$isk)b5.$deferredAction()}var a3=Object.keys(a4.pending)
for(var e=0;e<a3.length;e++)finishClass(a3[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.charCodeAt(0)
var a0
if(d!=="^"&&d!=="$reflectable"&&c!==43&&c!==42&&(a0=g[d])!=null&&a0.constructor===Array&&d!=="<>")addStubs(g,a0,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(c,d){var g
if(d.hasOwnProperty("$deferredAction"))g=d.$deferredAction
return function foo(){var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}c.$deferredAction()
f.$deferredAction()}}function processClassData(b1,b2,b3){b2=convertToSlowObject(b2)
var g
var f=Object.keys(b2)
var e=false
var d=supportsDirectProtoAccess&&b1!="b"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="n"){processStatics(init.statics[b1]=b2.n,b3)
delete b2.n}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$defaultValues=b2[a0]
var a3=b2.$methodsWithOptionalArguments
if(!a3)b2.$methodsWithOptionalArguments=a3={}
a3[a0]=g}else{var a4=b2[a0]
if(a0!=="^"&&a4!=null&&a4.constructor===Array&&a0!=="<>")if(d)e=true
else addStubs(b2,a4,a0,false,[])
else g=a0}}if(e)b2.$deferredAction=finishAddStubsHelper
var a5=b2["^"],a6,a7,a8=a5
var a9=a8.split(";")
a8=a9[1]?a9[1].split(","):[]
a7=a9[0]
a6=a7.split(":")
if(a6.length==2){a7=a6[0]
var b0=a6[1]
if(b0)b2.$signature=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
b3.combinedConstructorFunction+=defineClass(b1,a8)
b3.constructorsList.push(b1)
b3.collected[b1]=[m,b2]
i.push(b1)}function processStatics(a3,a4){var g=Object.keys(a3)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a3[e]
var c=e.charCodeAt(0)
var a0
if(c===43){v[a0]=e.substring(1)
var a1=a3[e]
if(a1>0)a3[a0].$reflectable=a1
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$defaultValues=d
var a2=a3.$methodsWithOptionalArguments
if(!a2)a3.$methodsWithOptionalArguments=a2={}
a2[e]=a0}else if(typeof d==="function"){m[a0=e]=d
h.push(e)
init.globalFunctions[e]=d}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a0=e
processClassData(e,d,a4)}}}function addStubs(b2,b3,b4,b5,b6){var g=0,f=b3[g],e
if(typeof f=="string")e=b3[++g]
else{e=f
f=b4}var d=[b2[b4]=b2[f]=e]
e.$stubName=b4
b6.push(b4)
for(g++;g<b3.length;g++){e=b3[g]
if(typeof e!="function")break
if(!b5)e.$stubName=b3[++g]
d.push(e)
if(e.$stubName){b2[e.$stubName]=e
b6.push(e.$stubName)}}for(var c=0;c<d.length;g++,c++)d[c].$callName=b3[g]
var a0=b3[g]
b3=b3.slice(++g)
var a1=b3[0]
var a2=a1>>1
var a3=(a1&1)===1
var a4=a1===3
var a5=a1===1
var a6=b3[1]
var a7=a6>>1
var a8=(a6&1)===1
var a9=a2+a7!=d[0].length
var b0=b3[2]
if(typeof b0=="number")b3[2]=b0+b
var b1=2*a7+a2+3
if(a0){e=tearOff(d,b3,b5,b4,a9)
b2[b4].$getter=e
e.$getterStub=true
if(b5){init.globalFunctions[b4]=e
b6.push(a0)}b2[a0]=e
d.push(e)
e.$stubName=a0
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.dj"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.dj"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.dj(this,c,d,true,[],f).prototype
return g}:tearOffGetter(c,d,f,a0)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
if(!init.globalFunctions)init.globalFunctions=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.ch=function(){}
var dart=[["","",,E,{"^":"",cx:{"^":"b;"},cD:{"^":"b;a,b,c,d,dL:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
gG:function(a){return this.a},
dj:function(){var z,y,x,w
this.d=null
for(z=this.x.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.v)(z),++x){w=z[x]
if(w.gdL()==null)w.dj()}},
ga_:function(a){return this.c},
d1:function(a){var z,y,x,w,v,u,t,s
z=this.f
if(z!=null){y=z.r
x=a.e
if(y<x){z.r=x
y=z.a
x=z.d
w=a.y
x=y+x*w
z.a=x
y=z.b+z.e*w
z.b=y
w=z.c+z.f*w
z.c=w
if(x>6.283185307179586||x<0)z.a=C.d.c4(x,6.283185307179586)
if(y>6.283185307179586||y<0)z.b=C.d.c4(y,6.283185307179586)
if(w>6.283185307179586||w<0){y=C.d.c4(w,6.283185307179586)
z.c=y}else y=w
v=Math.cos(H.T(y))
u=Math.sin(H.T(y))
y=new V.af(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
y.af(v,-u,0,0,u,v,0,0,0,0,1,0,0,0,0,1)
x=z.b
v=Math.cos(H.T(x))
u=Math.sin(H.T(x))
x=new V.af(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
x.af(v,0,-u,0,0,1,0,0,u,0,v,0,0,0,0,1)
x=y.D(0,x)
y=z.a
v=Math.cos(H.T(y))
u=Math.sin(H.T(y))
y=new V.af(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
y.af(1,0,0,0,0,v,-u,0,0,u,v,0,0,0,0,1)
z.x=x.D(0,y)}t=z.x}else t=null
if(!J.E(t,this.r)){this.r=t
z=this.y
if(z==null);else z.a8()}z=this.e
if(z!=null)z.toString
for(z=this.x.b,y=z.length,s=0;s<z.length;z.length===y||(0,H.v)(z),++s)z[s].d1(a)},
b2:function(a){var z,y,x,w,v
z=a.dx
y=this.r
z.toString
if(y==null)z.a.push(z.gbu())
else z.a.push(y.D(0,z.gbu()))
z.b.a8()
z=this.e
y=a.dy
y.push(z==null?(y&&C.b).gO(y):z)
z=a.dy
x=(z&&C.b).gO(z)
if(x!=null&&this.c!=null){if(x.a==null){w=a.fr.j(0,"Depth")
if(w==null){z=a.a
w=new A.i2(null,null,null,null,null,null,null,z,"Depth",null,null,null,null,null)
w.eV(z,"Depth")
w.hR($.i4,$.i3)
w.x=w.f.j(0,"posAttr")
w.y=H.bx(w.r.j(0,"objClr"),"$isd2")
w.z=H.bx(w.r.j(0,"fogClr"),"$isd2")
w.Q=H.bx(w.r.j(0,"fogStart"),"$isd0")
w.ch=H.bx(w.r.j(0,"fogStop"),"$isd0")
w.cx=H.bx(w.r.j(0,"viewObjMat"),"$isd3")
w.cy=H.bx(w.r.j(0,"projMat"),"$isd3")
if(a.fr.bU("Depth"))H.p(P.F('Shader cache already contains a shader by the name "Depth".'))
a.fr.F(0,"Depth",w)}x.a=w}z=this.d
if(!(z instanceof Z.dM)){this.d=null
z=null}if(z==null){z=this.c.hb(new Z.l5(a.a),$.$get$ag())
z.hH($.$get$ag()).e=x.a.gi6().ge6()
this.d=z}z=x.a
z.a2(a)
z.se8(x.b)
z.sdZ(x.c)
z.se_(x.d)
z.se0(x.e)
z.si9(a.cy.gbu())
y=a.cx
if(y==null){y=a.db.gbu().D(0,a.dx.gbu())
a.cx=y}z.siz(y)
y=this.d
y.a2(a)
y.b2(a)
y.aO(a)
x.a.aO(a)}for(z=this.x.b,y=z.length,v=0;v<z.length;z.length===y||(0,H.v)(z),++v)z[v].b2(a)
a.eb()
a.dx.bw()},
iP:[function(a){this.d=null},"$1","ge9",2,0,18],
i4:function(a){var z=this.y
if(z==null);else z.a8()}},ie:{"^":"b;a,b",
p:function(a,b){this.b.push(b)
this.a.i4([b])},
gE:function(a){return this.b.length===0},
gk:function(a){return this.b.length},
j:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.d(z,b)
return z[b]},
K:function(a,b){return C.b.K(this.b,b)},
B:function(a,b){return C.b.B(this.b,b)}},ii:{"^":"b;a,b,c",
p:function(a,b){this.a.push(b)},
S:function(a){var z,y
z={}
z.a=a
if(a==null){a=new E.O(null)
z.a=a
y=a}else y=a
if(this.c>0){if(this.b==null)this.b=y}else C.b.B(this.a,new E.ij(z))},
a8:function(){return this.S(null)},
ij:function(a,b){var z,y
z=this.c
if(z>0){--z
this.c=z
if(z<=0)z=this.b!=null
else z=!1
if(z){y=this.b
this.b=null
this.S(y)}}},
b3:function(){return this.ij(!0,!1)},
eN:function(){this.a=H.e([],[{func:1,v:true,args:[E.O]}])
this.b=null
this.c=0},
n:{
ad:function(){var z=new E.ii(null,null,null)
z.eN()
return z}}},ij:{"^":"f:20;a",
$1:function(a){a.$1(this.a.a)}},O:{"^":"b;a"},ev:{"^":"O;"},jb:{"^":"ev;e,f,r,x,y,b,c,d,a"},jc:{"^":"ev;e,b,c,d,a"},ee:{"^":"O;b,a"},jO:{"^":"O;b,a"},j9:{"^":"b;a,b",
gk:function(a){return this.a.length},
gbu:function(){var z=this.a
if(z.length>0)return C.b.gO(z)
else return V.ej()},
ec:function(a){var z=this.a
if(a==null)z.push(V.ej())
else z.push(a)
this.b.a8()},
bw:function(){var z=this.a
if(z.length>0){z.pop()
this.b.a8()}},
eQ:function(){this.a=H.e([],[V.af])
this.b=E.ad()},
n:{
cL:function(){var z=new E.j9(null,null)
z.eQ()
return z}}},jt:{"^":"b;cl:a<,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dL:dy<,fr",
eb:function(){var z=this.dy
if(z.length>1)z.pop()},
eT:function(a,b){var z
this.c=512
this.d=512
this.e=0
z=new P.bh(Date.now(),!1)
this.f=z
this.r=z
this.x=z
this.y=0
this.z=null
this.Q=null
this.ch=null
this.cx=null
z=E.cL()
z.b.a.push(new E.jv(this))
this.cy=z
z=E.cL()
z.b.a.push(new E.jw(this))
this.db=z
z=E.cL()
z.b.a.push(new E.jx(this))
this.dx=z
z=H.e([],[O.eQ])
this.dy=z
z.push(null)
this.fr=H.e(new H.a9(0,null,null,null,null,null,0),[P.o,A.eF])},
n:{
ju:function(a,b){var z=new E.jt(a,b,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.eT(a,b)
return z}}},jv:{"^":"f:5;a",
$1:function(a){var z=this.a
z.z=null
z.ch=null}},jw:{"^":"f:5;a",
$1:function(a){var z=this.a
z.z=null
z.Q=null
z.ch=null
z.cx=null}},jx:{"^":"f:5;a",
$1:function(a){var z=this.a
z.ch=null
z.cx=null}},ka:{"^":"b;a,b,cl:c<,d,e,f,r",
dG:function(){var z,y,x,w
z=window.devicePixelRatio
y=this.b.clientWidth
if(typeof y!=="number")return y.D()
if(typeof z!=="number")return H.t(z)
x=C.d.c1(Math.floor(y*z))
y=this.b.clientHeight
if(typeof y!=="number")return y.D()
w=C.d.c1(Math.floor(y*z))
y=this.b
if(y.width!==x||y.height!==w){y.width=x
y.height=w}},
ee:function(){var z,y,x,w,v
try{this.dG()
if(this.d!=null){x=this.e;++x.e
x.r=x.x
w=Date.now()
x.x=new P.bh(w,!1)
x.y=P.i7(0,0,0,x.r.a-w,0,0).a*0.000001
w=x.cy
C.b.sk(w.a,0)
w.b.a8()
w=x.db
C.b.sk(w.a,0)
w.b.a8()
w=x.dx
C.b.sk(w.a,0)
w.b.a8()
w=x.dy;(w&&C.b).sk(w,0)
x.dy.push(null)
this.d.b2(this.e)}}catch(v){x=H.D(v)
z=x
y=H.S(v)
P.bb("Error: "+H.c(z))
P.bb("Stack: "+H.c(y))
throw H.a(z)}},
eY:function(a,b,c,d,e){var z,y,x,w
z=J.hp(a,!0,!0,!0,!1)
if(z==null)throw H.a(P.F("Failed to get the rendering context for WebGL."))
this.b=a
this.a=a
this.c=z
this.d=null
this.e=E.ju(z,a)
y=this.c
x=new T.k9(y,null,null,null,null)
x.b=J.hq(y,3379)
x.c=y.getParameter(34076)
x.d=0
x.e=0
this.f=x
x=this.b
y=new E.kU(x,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
y.b=E.ad()
y.c=E.ad()
y.d=E.ad()
y.e=E.ad()
y.f=E.ad()
y.r=E.ad()
y.x=!1
y.Q=null
y.y=null
y.ch=null
y.z=null
y.cx=!1
y.cy=!1
y.db=!1
w=H.e([],[[P.eL,P.b]])
y.dx=w
x.toString
x=C.E.aJ(x)
x=H.e(new W.aq(0,x.a,x.b,W.ac(y.gfG()),!1),[H.X(x,0)])
x.a6()
w.push(x)
x=y.dx
w=y.a
w.toString
w=C.o.aJ(w)
w=H.e(new W.aq(0,w.a,w.b,W.ac(y.gfI()),!1),[H.X(w,0)])
w.a6()
x.push(w)
w=y.dx
x=y.a
x.toString
x=C.n.aJ(x)
x=H.e(new W.aq(0,x.a,x.b,W.ac(y.gfH()),!1),[H.X(x,0)])
x.a6()
w.push(x)
x=y.dx
w=y.a
w.toString
w=C.a_.aJ(w)
w=H.e(new W.aq(0,w.a,w.b,W.ac(y.gfJ()),!1),[H.X(w,0)])
w.a6()
x.push(w)
w=y.dx
x=C.n.cO(document)
x=H.e(new W.aq(0,x.a,x.b,W.ac(y.gfC()),!1),[H.X(x,0)])
x.a6()
w.push(x)
x=y.dx
w=C.o.cO(document)
w=H.e(new W.aq(0,w.a,w.b,W.ac(y.gfD()),!1),[H.X(w,0)])
w.a6()
x.push(w)
w=y.dx
x=y.a
x.toString
x=C.D.aJ(x)
x=H.e(new W.aq(0,x.a,x.b,W.ac(y.gfF()),!1),[H.X(x,0)])
x.a6()
w.push(x)
x=y.dx
w=y.a
w.toString
w=C.C.aJ(w)
w=H.e(new W.aq(0,w.a,w.b,W.ac(y.gfE()),!1),[H.X(w,0)])
w.a6()
x.push(w)
this.r=y
this.dG()},
n:{
kb:function(a,b,c,d,e){var z,y,x,w
z=J.u(a)
if(!!z.$isdO)return E.eT(a,!0,!0,!0,!1)
y=W.dP(null,null)
x=y.style
x.width="100%"
x.height="100%"
z.gdW(a).p(0,y)
w=E.eT(y,!0,!0,!0,!1)
w.a=a
return w},
eT:function(a,b,c,d,e){var z=new E.ka(null,null,null,null,null,null,null)
z.eY(a,!0,!0,!0,!1)
return z}}},kU:{"^":"b;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx",
bf:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=this.a.getBoundingClientRect()
y=J.m(a)
x=J.bV(y.gc_(a))
w=J.m(z)
v=w.gb_(z)
if(typeof x!=="number")return x.X()
if(typeof v!=="number")return H.t(v)
u=J.dB(y.gc_(a))
w=w.gb6(z)
if(typeof u!=="number")return u.X()
if(typeof w!=="number")return H.t(w)
t=new V.an(null,null)
t.a=x-v
t.b=u-w
s=new P.bh(Date.now(),!1)
w=this.a
w=P.aR(w.clientLeft,w.clientTop,w.clientWidth,w.clientHeight,null)
u=this.a
r=new V.bI(null,null,null,null)
r.W(0,0,w.c,P.aR(u.clientLeft,u.clientTop,u.clientWidth,u.clientHeight,null).d)
this.cx=y.gbn(a)===!0||a.metaKey===!0
this.cy=a.altKey
this.db=a.shiftKey
x=this.x
w=this.y
v=this.z
u=this.Q
q=this.ch
if(b){this.Q=s
this.y=t}this.ch=s
this.z=t
return new E.jb(x,w,v,u,q,r,t,s,this)},
iI:[function(a){this.x=!0
this.b.S(this.bf(a,!0))
J.ct(a)},"$1","gfG",2,0,3],
iK:[function(a){this.x=!1
this.c.S(this.bf(a,!0))
J.ct(a)},"$1","gfI",2,0,3],
iF:[function(a){var z
if(this.x){z=this.a
z=!P.aR(z.clientLeft,z.clientTop,z.clientWidth,z.clientHeight,null).dY(0,J.dy(a))}else z=!1
if(z){this.x=!1
this.c.S(this.bf(a,!0))}},"$1","gfD",2,0,3],
iJ:[function(a){this.d.S(this.bf(a,!1))
J.ct(a)},"$1","gfH",2,0,3],
iE:[function(a){var z
if(this.x){z=this.a
z=!P.aR(z.clientLeft,z.clientTop,z.clientWidth,z.clientHeight,null).dY(0,J.dy(a))}else z=!1
if(z)this.d.S(this.bf(a,!1))},"$1","gfC",2,0,3],
iL:[function(a){var z,y,x,w,v,u,t
z=J.m(a)
y=J.bV(z.gbv(a))
x=J.dB(z.gbv(a))
w=new V.an(null,null)
w.a=y
w.b=x
x=Date.now()
y=this.a
y=P.aR(y.clientLeft,y.clientTop,y.clientWidth,y.clientHeight,null)
v=this.a
u=new V.bI(null,null,null,null)
u.W(0,0,y.c,P.aR(v.clientLeft,v.clientTop,v.clientWidth,v.clientHeight,null).d)
z=z.gho(a)
v=C.Z.ghp(a)
y=new V.ap(null,null)
y.a=z
y.b=v
t=y.Y(0,180)
this.cx=a.ctrlKey===!0||a.metaKey===!0
this.cy=a.altKey
this.db=a.shiftKey
this.e.S(new E.jc(t,u,w,new P.bh(x,!1),this))
a.preventDefault()},"$1","gfJ",2,0,15],
iH:[function(a){var z=J.m(a)
this.cx=z.gbn(a)===!0||z.gbY(a)===!0
this.cy=z.gbR(a)
this.db=z.gbF(a)
this.f.S(new E.ee(z.ge5(a),this))
a.preventDefault()},"$1","gfF",2,0,8],
iG:[function(a){var z=J.m(a)
this.cx=z.gbn(a)===!0||z.gbY(a)===!0
this.cy=z.gbR(a)
this.db=z.gbF(a)
this.r.S(new E.ee(z.ge5(a),this))
a.preventDefault()},"$1","gfE",2,0,8]}}],["","",,Z,{"^":"",fk:{"^":"b;a,b",
a2:function(a){J.bd(a.a,this.a,this.b)},
aO:function(a){J.bd(a.a,this.a,null)},
n:{
d7:function(a,b,c){var z=J.ds(a)
a.bindBuffer(b,z)
a.bufferData(b,new Int16Array(H.dg(c)),35044)
a.bindBuffer(b,null)
return new Z.fk(b,z)}}},dL:{"^":"cx;a,b,c,d,e",
a2:function(a){var z,y,x
try{J.dv(a.gcl(),this.e)
J.hC(a.gcl(),this.e,this.b,5126,!1,this.d,this.c)}catch(y){x=H.D(y)
z=x
throw H.a(P.F('Failed to bind buffer attribute "'+J.C(this.a)+'": '+H.c(z)))}},
aO:function(a){J.cp(a.a,this.e)},
h:function(a){return"["+J.C(this.a)+", Size: "+this.b+", Offset: "+this.c+", Stride: "+this.d+", Attr: "+H.c(this.e)+"]"}},l5:{"^":"b;a"},dM:{"^":"b;a,b,c,d",
gcC:function(a){return this.c},
hH:function(a){var z,y,x,w
for(z=this.c,y=z.length,x=0;x<y;++x){w=z[x]
if((w.a.a&a.a)>>>0!==0)return w}return},
a2:function(a){var z,y
z=this.a
J.bd(a.a,z.a,z.b)
for(z=this.c,y=z.length-1;y>=0;--y)z[y].a2(a)},
aO:function(a){var z,y,x
for(z=this.c,y=z.length-1;y>=0;--y){x=z[y]
J.cp(a.a,x.e)}J.bd(a.a,this.a.a,null)},
b2:function(a){var z,y,x,w,v
z=this.b.length
for(y=0;y<z;++y){x=this.b
if(y>=x.length)return H.d(x,y)
w=x[y]
x=w.c
v=x.a
J.bd(a.a,v,x.b)
J.hi(a.a,w.a,w.b,5123,0)
J.bd(a.a,v,null)}},
h:function(a){var z,y,x,w,v
z=H.e([],[P.o])
for(y=this.b,x=y.length,w=0;w<y.length;y.length===x||(0,H.v)(y),++w)z.push(y[w].h(0))
v=H.e([],[P.o])
for(y=this.c,x=y.length,w=0;w<x;++w)v.push(J.C(y[w]))
return"Buffer:  ["+H.bn(this.a)+"]\nIndices: "+C.b.P(z,", ")+"\nAttrs:   "+C.b.P(v,", ")}},bY:{"^":"b;a,b,c",
h:function(a){return"Type: "+this.a+", Count: "+this.b+", ["+H.bn(this.c)+"]"}},a4:{"^":"b;a",
gd8:function(a){var z,y
z=this.a
y=(z&$.$get$ag().a)>>>0!==0?3:0
if((z&$.$get$aC().a)>>>0!==0)y+=3
if((z&$.$get$aB().a)>>>0!==0)y+=3
if((z&$.$get$aD().a)>>>0!==0)y+=2
if((z&$.$get$aE().a)>>>0!==0)y+=3
if((z&$.$get$aS().a)>>>0!==0)y+=3
if((z&$.$get$aT().a)>>>0!==0)y+=4
if((z&$.$get$aF().a)>>>0!==0)++y
return(z&$.$get$aA().a)>>>0!==0?y+4:y},
h7:function(a){var z,y,x
z=$.$get$ag()
y=this.a
if((y&z.a)>>>0!==0){if(0===a)return z
x=1}else x=0
z=$.$get$aC()
if((y&z.a)>>>0!==0){if(x===a)return z;++x}z=$.$get$aB()
if((y&z.a)>>>0!==0){if(x===a)return z;++x}z=$.$get$aD()
if((y&z.a)>>>0!==0){if(x===a)return z;++x}z=$.$get$aE()
if((y&z.a)>>>0!==0){if(x===a)return z;++x}z=$.$get$aS()
if((y&z.a)>>>0!==0){if(x===a)return z;++x}z=$.$get$aT()
if((y&z.a)>>>0!==0){if(x===a)return z;++x}z=$.$get$aF()
if((y&z.a)>>>0!==0){if(x===a)return z;++x}z=$.$get$aA()
if((y&z.a)>>>0!==0)if(x===a)return z
return $.$get$fj()},
K:function(a,b){var z,y
z=this.a
if((z&$.$get$ag().a)>>>0!==0)y=1
else y=0
if((z&$.$get$aC().a)>>>0!==0)++y
if((z&$.$get$aB().a)>>>0!==0)++y
if((z&$.$get$aD().a)>>>0!==0)++y
if((z&$.$get$aE().a)>>>0!==0)++y
if((z&$.$get$aS().a)>>>0!==0)++y
if((z&$.$get$aT().a)>>>0!==0)++y
if((z&$.$get$aF().a)>>>0!==0)++y
if((z&$.$get$aA().a)>>>0!==0);return-1},
iO:[function(a,b){var z,y
z=this.a
if((z&$.$get$ag().a)>>>0!==0)y=3
else y=0
if((z&$.$get$aC().a)>>>0!==0)y+=3
if((z&$.$get$aB().a)>>>0!==0)y+=3
if((z&$.$get$aD().a)>>>0!==0)y+=2
if((z&$.$get$aE().a)>>>0!==0)y+=3
if((z&$.$get$aS().a)>>>0!==0)y+=3
if((z&$.$get$aT().a)>>>0!==0)y+=4
if((z&$.$get$aF().a)>>>0!==0)++y
if((z&$.$get$aA().a)>>>0!==0);return-1},"$1","gbv",2,0,23],
h:function(a){var z,y
z=H.e([],[P.o])
y=this.a
if((y&$.$get$ag().a)>>>0!==0)z.push("Pos")
if((y&$.$get$aC().a)>>>0!==0)z.push("Norm")
if((y&$.$get$aB().a)>>>0!==0)z.push("Binm")
if((y&$.$get$aD().a)>>>0!==0)z.push("Txt2D")
if((y&$.$get$aE().a)>>>0!==0)z.push("TxtCube")
if((y&$.$get$aS().a)>>>0!==0)z.push("Clr3")
if((y&$.$get$aT().a)>>>0!==0)z.push("Clr4")
if((y&$.$get$aF().a)>>>0!==0)z.push("Weight")
if((y&$.$get$aA().a)>>>0!==0)z.push("Bending")
if(z.length<=0)return"None"
return C.b.P(z,"|")}}}],["","",,V,{"^":"",
ng:[function(a,b){return V.hS(a,b,1e-9)},"$2","j8",4,0,38],
hS:function(a,b,c){var z=J.U(a)
if(z.H(a,b))return J.dr(J.B(b,a),c)
else return J.dr(z.X(a,b),c)},
G:function(a,b,c){var z=J.dE($.q.$2(a,0)===!0?0:a,b)
if(typeof b!=="number")return H.t(b)
return C.a.ad(z,c+b+1)},
cg:function(a,b,c){var z,y,x,w,v,u,t,s
z=H.e([],[P.o])
for(y=c+b+1,x=0,w=0;w<4;++w){v=a[w]
u=C.a.ad(J.dE($.q.$2(v,0)===!0?0:v,b),y)
x=P.mW(x,u.length)
z.push(u)}for(y=z.length,t=y-1;t>=0;--t,y=s){if(t>=y)return H.d(z,t)
y=C.a.ad(z[t],x)
s=z.length
if(t>=s)return H.d(z,t)
z[t]=y}return z},
aY:{"^":"b;bi:a<,bg:b<,bb:c<",
aP:function(a,b,c){var z=J.U(a)
if(z.H(a,0))z=0
else z=z.a1(a,1)?1:a
this.a=z
z=J.U(b)
if(z.H(b,0))z=0
else z=z.a1(b,1)?1:b
this.b=z
z=J.U(c)
if(z.H(c,0))z=0
else z=z.a1(c,1)?1:c
this.c=z},
ab:function(){var z=new V.aY(null,null,null)
z.aP(this.a,this.b,this.c)
return z},
t:function(a,b){var z=new V.aY(null,null,null)
z.aP(J.j(this.a,b.gbi()),J.j(this.b,b.gbg()),J.j(this.c,b.gbb()))
return z},
X:function(a,b){var z=new V.aY(null,null,null)
z.aP(J.B(this.a,b.gbi()),J.B(this.b,b.gbg()),J.B(this.c,b.gbb()))
return z},
D:function(a,b){var z,y
z=J.ci(b)
y=new V.aY(null,null,null)
y.aP(z.D(b,this.a),z.D(b,this.b),z.D(b,this.c))
return y},
w:function(a,b){var z,y
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof V.aY))return!1
z=b.a
y=this.a
if($.q.$2(z,y)!==!0)return!1
z=b.b
y=this.b
if($.q.$2(z,y)!==!0)return!1
z=b.c
y=this.c
if($.q.$2(z,y)!==!0)return!1
return!0},
R:function(a,b,c){return"["+V.G(this.a,b,c)+", "+V.G(this.b,b,c)+", "+V.G(this.c,b,c)+"]"},
h:function(a){return this.R(a,3,0)},
A:function(a,b){return this.R(a,b,0)}},
aw:{"^":"b;bi:a<,bg:b<,bb:c<,di:d<",
W:function(a,b,c,d){var z=J.U(a)
if(z.H(a,0))z=0
else z=z.a1(a,1)?1:a
this.a=z
z=J.U(b)
if(z.H(b,0))z=0
else z=z.a1(b,1)?1:b
this.b=z
z=J.U(c)
if(z.H(c,0))z=0
else z=z.a1(c,1)?1:c
this.c=z
z=J.U(d)
if(z.H(d,0))z=0
else z=z.a1(d,1)?1:d
this.d=z},
ab:function(){var z=new V.aw(null,null,null,null)
z.W(this.a,this.b,this.c,this.d)
return z},
t:function(a,b){var z=new V.aw(null,null,null,null)
z.W(J.j(this.a,b.gbi()),J.j(this.b,b.gbg()),J.j(this.c,b.gbb()),J.j(this.d,b.gdi()))
return z},
X:function(a,b){var z=new V.aw(null,null,null,null)
z.W(J.B(this.a,b.gbi()),J.B(this.b,b.gbg()),J.B(this.c,b.gbb()),J.B(this.d,b.gdi()))
return z},
D:function(a,b){var z,y
z=J.ci(b)
y=new V.aw(null,null,null,null)
y.W(z.D(b,this.a),z.D(b,this.b),z.D(b,this.c),z.D(b,this.d))
return y},
w:function(a,b){var z,y
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof V.aw))return!1
z=b.a
y=this.a
if($.q.$2(z,y)!==!0)return!1
z=b.b
y=this.b
if($.q.$2(z,y)!==!0)return!1
z=b.c
y=this.c
if($.q.$2(z,y)!==!0)return!1
z=b.d
y=this.d
if($.q.$2(z,y)!==!0)return!1
return!0},
R:function(a,b,c){return"["+V.G(this.a,b,c)+", "+V.G(this.b,b,c)+", "+V.G(this.c,b,c)+", "+V.G(this.d,b,c)+"]"},
h:function(a){return this.R(a,3,0)},
A:function(a,b){return this.R(a,b,0)}},
af:{"^":"b;fB:a<,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx",
af:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){this.a=a
this.b=b
this.c=c
this.d=d
this.e=e
this.f=f
this.r=g
this.x=h
this.y=i
this.z=j
this.Q=k
this.ch=l
this.cx=m
this.cy=n
this.db=o
this.dx=p},
ej:function(a,b){return[this.a,this.e,this.y,this.cx,this.b,this.f,this.z,this.cy,this.c,this.r,this.Q,this.db,this.d,this.x,this.ch,this.dx]},
ab:function(){var z=new V.af(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.af(this.a,this.b,this.c,this.d,this.e,this.f,this.r,this.x,this.y,this.z,this.Q,this.ch,this.cx,this.cy,this.db,this.dx)
return z},
D:function(a,b){var z=new V.af(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.af(J.j(J.j(J.j(J.h(this.a,b.gfB()),J.h(this.b,b.e)),J.h(this.c,b.y)),J.h(this.d,b.cx)),J.j(J.j(J.j(J.h(this.a,b.b),J.h(this.b,b.f)),J.h(this.c,b.z)),J.h(this.d,b.cy)),J.j(J.j(J.j(J.h(this.a,b.c),J.h(this.b,b.r)),J.h(this.c,b.Q)),J.h(this.d,b.db)),J.j(J.j(J.j(J.h(this.a,b.d),J.h(this.b,b.x)),J.h(this.c,b.ch)),J.h(this.d,b.dx)),J.j(J.j(J.j(J.h(this.e,b.a),J.h(this.f,b.e)),J.h(this.r,b.y)),J.h(this.x,b.cx)),J.j(J.j(J.j(J.h(this.e,b.b),J.h(this.f,b.f)),J.h(this.r,b.z)),J.h(this.x,b.cy)),J.j(J.j(J.j(J.h(this.e,b.c),J.h(this.f,b.r)),J.h(this.r,b.Q)),J.h(this.x,b.db)),J.j(J.j(J.j(J.h(this.e,b.d),J.h(this.f,b.x)),J.h(this.r,b.ch)),J.h(this.x,b.dx)),J.j(J.j(J.j(J.h(this.y,b.a),J.h(this.z,b.e)),J.h(this.Q,b.y)),J.h(this.ch,b.cx)),J.j(J.j(J.j(J.h(this.y,b.b),J.h(this.z,b.f)),J.h(this.Q,b.z)),J.h(this.ch,b.cy)),J.j(J.j(J.j(J.h(this.y,b.c),J.h(this.z,b.r)),J.h(this.Q,b.Q)),J.h(this.ch,b.db)),J.j(J.j(J.j(J.h(this.y,b.d),J.h(this.z,b.x)),J.h(this.Q,b.ch)),J.h(this.ch,b.dx)),J.j(J.j(J.j(J.h(this.cx,b.a),J.h(this.cy,b.e)),J.h(this.db,b.y)),J.h(this.dx,b.cx)),J.j(J.j(J.j(J.h(this.cx,b.b),J.h(this.cy,b.f)),J.h(this.db,b.z)),J.h(this.dx,b.cy)),J.j(J.j(J.j(J.h(this.cx,b.c),J.h(this.cy,b.r)),J.h(this.db,b.Q)),J.h(this.dx,b.db)),J.j(J.j(J.j(J.h(this.cx,b.d),J.h(this.cy,b.x)),J.h(this.db,b.ch)),J.h(this.dx,b.dx)))
return z},
w:function(a,b){var z,y
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof V.af))return!1
z=b.a
y=this.a
if($.q.$2(z,y)!==!0)return!1
z=b.b
y=this.b
if($.q.$2(z,y)!==!0)return!1
z=b.c
y=this.c
if($.q.$2(z,y)!==!0)return!1
z=b.d
y=this.d
if($.q.$2(z,y)!==!0)return!1
z=b.e
y=this.e
if($.q.$2(z,y)!==!0)return!1
z=b.f
y=this.f
if($.q.$2(z,y)!==!0)return!1
z=b.r
y=this.r
if($.q.$2(z,y)!==!0)return!1
z=b.x
y=this.x
if($.q.$2(z,y)!==!0)return!1
z=b.y
y=this.y
if($.q.$2(z,y)!==!0)return!1
z=b.z
y=this.z
if($.q.$2(z,y)!==!0)return!1
z=b.Q
y=this.Q
if($.q.$2(z,y)!==!0)return!1
z=b.ch
y=this.ch
if($.q.$2(z,y)!==!0)return!1
z=b.cx
y=this.cx
if($.q.$2(z,y)!==!0)return!1
z=b.cy
y=this.cy
if($.q.$2(z,y)!==!0)return!1
z=b.db
y=this.db
if($.q.$2(z,y)!==!0)return!1
z=b.dx
y=this.dx
if($.q.$2(z,y)!==!0)return!1
return!0},
ek:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q
z=V.cg([this.a,this.e,this.y,this.cx],c,d)
y=V.cg([this.b,this.f,this.z,this.cy],c,d)
x=V.cg([this.c,this.r,this.Q,this.db],c,d)
w=V.cg([this.d,this.x,this.ch,this.dx],c,d)
v=z.length
if(0>=v)return H.d(z,0)
u="["+z[0]+", "
t=y.length
if(0>=t)return H.d(y,0)
u=u+y[0]+", "
s=x.length
if(0>=s)return H.d(x,0)
u=u+x[0]+", "
r=w.length
if(0>=r)return H.d(w,0)
u=u+w[0]+",\n"
q=b+" "
if(1>=v)return H.d(z,1)
q=q+z[1]+", "
if(1>=t)return H.d(y,1)
q=q+y[1]+", "
if(1>=s)return H.d(x,1)
q=q+x[1]+", "
if(1>=r)return H.d(w,1)
q=u+(q+w[1]+",\n")
u=b+" "
if(2>=v)return H.d(z,2)
u=u+z[2]+", "
if(2>=t)return H.d(y,2)
u=u+y[2]+", "
if(2>=s)return H.d(x,2)
u=u+x[2]+", "
if(2>=r)return H.d(w,2)
u=q+(u+w[2]+",\n")
q=b+" "
if(3>=v)return H.d(z,3)
q=q+z[3]+", "
if(3>=t)return H.d(y,3)
q=q+y[3]+", "
if(3>=s)return H.d(x,3)
q=q+x[3]+", "
if(3>=r)return H.d(w,3)
return u+(q+w[3]+"]")},
h:function(a){return this.ek(a,"",3,0)},
A:function(a,b){return this.ek(a,b,3,0)},
n:{
ej:function(){var z=new V.af(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.af(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)
return z}}},
an:{"^":"b;ai:a<,at:b<",
gu:function(a){return this.a},
gv:function(a){return this.b},
ab:function(){var z,y,x
z=this.a
y=this.b
x=new V.an(null,null)
x.a=z
x.b=y
return x},
t:function(a,b){var z,y,x
z=J.j(this.a,b.gai())
y=J.j(this.b,b.gat())
x=new V.an(null,null)
x.a=z
x.b=y
return x},
X:function(a,b){var z,y,x
z=J.B(this.a,b.gai())
y=J.B(this.b,b.gat())
x=new V.an(null,null)
x.a=z
x.b=y
return x},
D:function(a,b){var z,y,x
z=J.h(this.a,b)
y=J.h(this.b,b)
x=new V.an(null,null)
x.a=z
x.b=y
return x},
w:function(a,b){var z,y
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof V.an))return!1
z=b.a
y=this.a
if($.q.$2(z,y)!==!0)return!1
z=b.b
y=this.b
if($.q.$2(z,y)!==!0)return!1
return!0},
R:function(a,b,c){return"["+V.G(this.a,b,c)+", "+V.G(this.b,b,c)+"]"},
h:function(a){return this.R(a,3,0)},
A:function(a,b){return this.R(a,b,0)}},
aO:{"^":"b;ai:a<,at:b<,bQ:c<",
gu:function(a){return this.a},
gv:function(a){return this.b},
gb8:function(a){return this.c},
ab:function(){var z,y,x,w
z=this.a
y=this.b
x=this.c
w=new V.aO(null,null,null)
w.a=z
w.b=y
w.c=x
return w},
t:function(a,b){var z,y,x,w
z=J.j(this.a,b.gai())
y=J.j(this.b,b.gat())
x=J.j(this.c,b.gbQ())
w=new V.aO(null,null,null)
w.a=z
w.b=y
w.c=x
return w},
X:function(a,b){var z,y,x,w
z=J.B(this.a,b.gai())
y=J.B(this.b,b.b)
x=J.B(this.c,b.c)
w=new V.aO(null,null,null)
w.a=z
w.b=y
w.c=x
return w},
D:function(a,b){var z,y,x,w
z=J.h(this.a,b)
y=J.h(this.b,b)
x=J.h(this.c,b)
w=new V.aO(null,null,null)
w.a=z
w.b=y
w.c=x
return w},
w:function(a,b){var z,y
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof V.aO))return!1
z=b.a
y=this.a
if($.q.$2(z,y)!==!0)return!1
z=b.b
y=this.b
if($.q.$2(z,y)!==!0)return!1
z=b.c
y=this.c
if($.q.$2(z,y)!==!0)return!1
return!0},
R:function(a,b,c){return"["+V.G(this.a,b,c)+", "+V.G(this.b,b,c)+", "+V.G(this.c,b,c)+"]"},
h:function(a){return this.R(a,3,0)},
A:function(a,b){return this.R(a,b,0)}},
b0:{"^":"b;ai:a<,at:b<,bQ:c<,dO:d<",
gu:function(a){return this.a},
gv:function(a){return this.b},
gb8:function(a){return this.c},
W:function(a,b,c,d){this.a=a
this.b=b
this.c=c
this.d=d},
ab:function(){var z=new V.b0(null,null,null,null)
z.W(this.a,this.b,this.c,this.d)
return z},
t:function(a,b){var z=new V.b0(null,null,null,null)
z.W(J.j(this.a,b.gai()),J.j(this.b,b.gat()),J.j(this.c,b.gbQ()),J.j(this.d,b.gdO()))
return z},
X:function(a,b){var z=new V.b0(null,null,null,null)
z.W(J.B(this.a,b.gai()),J.B(this.b,b.gat()),J.B(this.c,b.gbQ()),J.B(this.d,b.gdO()))
return z},
D:function(a,b){var z=new V.b0(null,null,null,null)
z.W(J.h(this.a,b),J.h(this.b,b),J.h(this.c,b),J.h(this.d,b))
return z},
w:function(a,b){var z,y
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof V.b0))return!1
z=b.a
y=this.a
if($.q.$2(z,y)!==!0)return!1
z=b.b
y=this.b
if($.q.$2(z,y)!==!0)return!1
z=b.c
y=this.c
if($.q.$2(z,y)!==!0)return!1
z=b.d
y=this.d
if($.q.$2(z,y)!==!0)return!1
return!0},
R:function(a,b,c){return"["+V.G(this.a,b,c)+", "+V.G(this.b,b,c)+", "+V.G(this.c,b,c)+", "+V.G(this.d,b,c)+"]"},
h:function(a){return this.R(a,3,0)},
A:function(a,b){return this.R(a,b,0)}},
bI:{"^":"b;ai:a<,at:b<,aU:c<,aV:d<",
gu:function(a){return this.a},
gv:function(a){return this.b},
W:function(a,b,c,d){if(typeof c!=="number")return c.H()
if(c<0){if(typeof a!=="number")return a.t()
this.a=a+c
this.c=-c}else{this.a=a
this.c=c}if(typeof d!=="number")return d.H()
if(d<0){if(typeof b!=="number")return b.t()
this.b=b+d
this.d=-d}else{this.b=b
this.d=d}},
ab:function(){var z=new V.bI(null,null,null,null)
z.W(this.a,this.b,this.c,this.d)
return z},
w:function(a,b){var z,y
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof V.bI))return!1
z=b.a
y=this.a
if($.q.$2(z,y)!==!0)return!1
z=b.b
y=this.b
if($.q.$2(z,y)!==!0)return!1
z=b.c
y=this.c
if($.q.$2(z,y)!==!0)return!1
z=b.d
y=this.d
if($.q.$2(z,y)!==!0)return!1
return!0},
R:function(a,b,c){return"["+V.G(this.a,b,c)+", "+V.G(this.b,b,c)+", "+V.G(this.c,b,c)+", "+V.G(this.d,b,c)+"]"},
h:function(a){return this.R(a,3,0)},
A:function(a,b){return this.R(a,b,0)}},
ap:{"^":"b;aU:a<,aV:b<",
hZ:[function(a){var z,y
z=this.a
z=J.h(z,z)
y=this.b
return Math.sqrt(H.T(J.j(z,J.h(y,y))))},"$0","gk",0,0,11],
ab:function(){var z,y,x
z=this.a
y=this.b
x=new V.ap(null,null)
x.a=z
x.b=y
return x},
i3:[function(){var z,y
z=this.a
z=J.h(z,z)
y=this.b
return this.Y(0,Math.sqrt(H.T(J.j(z,J.h(y,y)))))},"$0","gaL",0,0,12],
t:function(a,b){var z,y,x
z=J.j(this.a,b.gaU())
y=J.j(this.b,b.gaV())
x=new V.ap(null,null)
x.a=z
x.b=y
return x},
X:function(a,b){var z,y,x
z=J.B(this.a,b.gaU())
y=J.B(this.b,b.gaV())
x=new V.ap(null,null)
x.a=z
x.b=y
return x},
D:function(a,b){var z,y,x
z=J.h(this.a,b)
y=J.h(this.b,b)
x=new V.ap(null,null)
x.a=z
x.b=y
return x},
Y:function(a,b){var z,y,x
if($.q.$2(b,0)===!0){z=new V.ap(null,null)
z.a=0
z.b=0
return z}z=this.a
if(typeof z!=="number")return z.Y()
y=this.b
if(typeof y!=="number")return y.Y()
x=new V.ap(null,null)
x.a=z/b
x.b=y/b
return x},
w:function(a,b){var z,y
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof V.ap))return!1
z=b.a
y=this.a
if($.q.$2(z,y)!==!0)return!1
z=b.b
y=this.b
if($.q.$2(z,y)!==!0)return!1
return!0},
R:function(a,b,c){return"["+V.G(this.a,b,c)+", "+V.G(this.b,b,c)+"]"},
h:function(a){return this.R(a,3,0)},
A:function(a,b){return this.R(a,b,0)}},
H:{"^":"b;aU:a<,aV:b<,dr:c<",
hZ:[function(a){return Math.sqrt(H.T(this.a3(this)))},"$0","gk",0,0,11],
a3:function(a){return J.j(J.j(J.h(this.a,a.a),J.h(this.b,a.b)),J.h(this.c,a.c))},
ab:function(){var z,y,x,w
z=this.a
y=this.b
x=this.c
w=new V.H(null,null,null)
w.a=z
w.b=y
w.c=x
return w},
cT:function(a,b){var z,y,x,w
z=this.a
y=J.B(a.a,z)
if(typeof y!=="number")return H.t(y)
y=J.j(z,b*y)
z=this.b
x=J.B(a.b,z)
if(typeof x!=="number")return H.t(x)
x=J.j(z,b*x)
z=this.c
w=J.B(a.c,z)
if(typeof w!=="number")return H.t(w)
w=J.j(z,b*w)
z=new V.H(null,null,null)
z.a=y
z.b=x
z.c=w
return z},
i3:[function(){return this.Y(0,Math.sqrt(H.T(this.a3(this))))},"$0","gaL",0,0,13],
cL:function(a){var z,y,x,w
z=J.B(J.h(this.b,a.c),J.h(this.c,a.b))
y=J.B(J.h(this.c,a.a),J.h(this.a,a.c))
x=J.B(J.h(this.a,a.b),J.h(this.b,a.a))
w=new V.H(null,null,null)
w.a=z
w.b=y
w.c=x
return w},
t:function(a,b){var z,y,x,w
z=J.j(this.a,b.gaU())
y=J.j(this.b,b.gaV())
x=J.j(this.c,b.gdr())
w=new V.H(null,null,null)
w.a=z
w.b=y
w.c=x
return w},
X:function(a,b){var z,y,x,w
z=J.B(this.a,b.gaU())
y=J.B(this.b,b.gaV())
x=J.B(this.c,b.gdr())
w=new V.H(null,null,null)
w.a=z
w.b=y
w.c=x
return w},
ay:function(a){var z,y,x,w
z=J.cn(this.a)
y=J.cn(this.b)
x=J.cn(this.c)
w=new V.H(null,null,null)
w.a=z
w.b=y
w.c=x
return w},
D:function(a,b){var z,y,x,w
z=J.h(this.a,b)
y=J.h(this.b,b)
x=J.h(this.c,b)
w=new V.H(null,null,null)
w.a=z
w.b=y
w.c=x
return w},
Y:function(a,b){var z,y,x,w
if($.q.$2(b,0)===!0){z=new V.H(null,null,null)
z.a=0
z.b=0
z.c=0
return z}z=this.a
if(typeof z!=="number")return z.Y()
y=this.b
if(typeof y!=="number")return y.Y()
x=this.c
if(typeof x!=="number")return x.Y()
w=new V.H(null,null,null)
w.a=z/b
w.b=y/b
w.c=x/b
return w},
hV:function(){var z=this.a
if($.q.$2(0,z)!==!0)return!1
z=this.b
if($.q.$2(0,z)!==!0)return!1
z=this.c
if($.q.$2(0,z)!==!0)return!1
return!0},
w:function(a,b){var z,y
if(b==null)return!1
if(this===b)return!0
if(!(b instanceof V.H))return!1
z=b.a
y=this.a
if($.q.$2(z,y)!==!0)return!1
z=b.b
y=this.b
if($.q.$2(z,y)!==!0)return!1
z=b.c
y=this.c
if($.q.$2(z,y)!==!0)return!1
return!0},
R:function(a,b,c){return"["+V.G(this.a,b,c)+", "+V.G(this.b,b,c)+", "+V.G(this.c,b,c)+"]"},
h:function(a){return this.R(a,3,0)},
A:function(a,b){return this.R(a,b,0)}}}],["","",,U,{"^":"",hT:{"^":"ek;a",
h:function(a){var z=this.a
return"Constant: "+(z==null?"null":J.ai(z,"          "))}},ek:{"^":"b;"},jy:{"^":"ek;a,b,c,d,e,f,r,x"}}],["","",,M,{"^":"",ig:{"^":"b;a,b,c,d,e,f,r",
b2:function(a){var z,y,x,w
z=new E.jO(a,this)
this.e.S(z)
y=a.dy
y.push((y&&C.b).gO(y))
this.b.a2(a)
this.a.a2(a)
for(y=this.d,x=y.length,w=0;w<y.length;y.length===x||(0,H.v)(y),++w)y[w].d1(a)
this.f.S(z)
for(y=this.d,x=y.length,w=0;w<y.length;y.length===x||(0,H.v)(y),++w)y[w].b2(a)
this.r.S(z)
this.a.toString
a.cy.bw()
a.db.bw()
this.b.toString
a.eb()}}}],["","",,A,{"^":"",dI:{"^":"b;a,G:b>,e6:c<",
hC:function(a){return J.dv(this.a,this.c)},
hw:function(a){return J.cp(this.a,this.c)}},hG:{"^":"b;a",
j:function(a,b){var z,y,x,w,v
for(z=this.a,y=z.length,x=0;w=z.length,x<w;w===y||(0,H.v)(z),++x){v=z[x]
if(v.b===b)return v}return},
K:function(a,b){var z,y
for(z=this.a,y=z.length-1;y>=0;--y)if(z[y].b===b)return y
return-1},
hE:function(){var z,y,x
for(z=this.a,y=z.length,x=0;x<z.length;z.length===y||(0,H.v)(z),++x)z[x].hC(0)},
hx:function(){var z,y,x
for(z=this.a,y=z.length,x=0;x<z.length;z.length===y||(0,H.v)(z),++x)z[x].hw(0)}},i2:{"^":"eF;x,y,z,Q,ch,cx,cy,a,b,c,d,e,f,r",
gi6:function(){return this.x},
se8:function(a){var z,y,x,w
z=this.y
y=a.a
x=a.b
w=a.c
return J.dG(z.a,z.d,y,x,w)},
sdZ:function(a){var z,y,x,w
z=this.z
y=a.a
x=a.b
w=a.c
return J.dG(z.a,z.d,y,x,w)},
se_:function(a){var z=this.Q
return J.dF(z.a,z.d,a)},
se0:function(a){var z=this.ch
return J.dF(z.a,z.d,a)},
siz:function(a){var z=this.cx
z.toString
return z.d6(a.ej(0,!0))},
si9:function(a){var z=this.cy
z.toString
return z.d6(a.ej(0,!0))}},eF:{"^":"cx;",
hR:function(a,b){var z,y,x
this.c=this.dn(a,35633)
this.d=this.dn(b,35632)
z=this.a
y=J.hf(z)
this.e=y
z.attachShader(y,this.c)
z.attachShader(this.e,this.d)
z.linkProgram(this.e)
if(z.getProgramParameter(this.e,35714)!==!0){x=z.getProgramInfoLog(this.e)
z.deleteProgram(this.e)
H.p(P.F("Failed to link shader: "+H.c(x)))}this.fS()
this.fX()},
gG:function(a){return this.b},
gcC:function(a){return this.f},
a2:function(a){J.dH(a.a,this.e)
this.f.hE()},
aO:function(a){J.dH(a.a,null)
this.f.hx()},
dn:function(a,b){var z,y,x
z=this.a
y=J.hg(z,b)
z.shaderSource(y,a)
z.compileShader(y)
if(z.getShaderParameter(y,35713)!==!0){x=z.getShaderInfoLog(y)
z.deleteShader(y)
throw H.a(P.F("Error compiling shader '"+J.C(y)+"': "+H.c(x)))}return y},
fS:function(){var z,y,x,w,v,u
z=H.e([],[A.dI])
y=this.a
x=J.dC(y,this.e,35721)
if(typeof x!=="number")return H.t(x)
w=0
for(;w<x;++w){v=y.getActiveAttrib(this.e,w)
u=y.getAttribLocation(this.e,v.name)
z.push(new A.dI(y,v.name,u))}this.f=new A.hG(z)},
fX:function(){var z,y,x,w,v,u
z=H.e([],[A.a2])
y=this.a
x=J.dC(y,this.e,35718)
if(typeof x!=="number")return H.t(x)
w=0
for(;w<x;++w){v=y.getActiveUniform(this.e,w)
u=y.getUniformLocation(this.e,v.name)
z.push(this.hn(v.type,v.size,v.name,u))}this.r=new A.kq(z)},
aT:function(a,b,c){var z,y
z=this.a
y=this.e
if(a===1)return new A.kj(z,y,b,c)
else return A.d1(z,y,b,a,c)},
fj:function(a,b,c){var z,y
z=this.a
y=this.e
if(a===1)return new A.kt(z,y,b,c)
else return A.d1(z,y,b,a,c)},
fk:function(a,b,c){var z,y
z=this.a
y=this.e
if(a===1)return new A.ku(z,y,b,c)
else return A.d1(z,y,b,a,c)},
bM:function(a,b){return new P.fs(a+" uniform variables are unsupported by all browsers.\n"+("Please change the type of "+H.c(b)+"."))},
hn:function(a,b,c,d){switch(a){case 5120:return this.aT(b,c,d)
case 5121:return this.aT(b,c,d)
case 5122:return this.aT(b,c,d)
case 5123:return this.aT(b,c,d)
case 5124:return this.aT(b,c,d)
case 5125:return this.aT(b,c,d)
case 5126:return new A.d0(this.a,this.e,c,d)
case 35664:return new A.kl(this.a,this.e,c,d)
case 35665:return new A.d2(this.a,this.e,c,d)
case 35666:return new A.ko(this.a,this.e,c,d)
case 35667:return new A.km(this.a,this.e,c,d)
case 35668:return new A.kn(this.a,this.e,c,d)
case 35669:return new A.kp(this.a,this.e,c,d)
case 35674:return new A.kr(this.a,this.e,c,d)
case 35675:return new A.ks(this.a,this.e,c,d)
case 35676:return new A.d3(this.a,this.e,c,d)
case 35678:return this.fj(b,c,d)
case 35680:return this.fk(b,c,d)
case 35670:throw H.a(this.bM("BOOL",c))
case 35671:throw H.a(this.bM("BOOL_VEC2",c))
case 35672:throw H.a(this.bM("BOOL_VEC3",c))
case 35673:throw H.a(this.bM("BOOL_VEC4",c))
default:throw H.a(P.F("Unknown uniform variable type "+H.c(a)+" for "+H.c(c)+"."))}},
eV:function(a,b){this.c=null
this.d=null
this.e=null
this.f=null
this.r=null}},a2:{"^":"b;G:c>,e6:d<"},kq:{"^":"b;a",
j:function(a,b){var z,y,x,w,v
for(z=this.a,y=z.length,x=0;w=z.length,x<w;w===y||(0,H.v)(z),++x){v=z[x]
if(v.c===b)return v}return},
K:function(a,b){var z,y
for(z=this.a,y=z.length-1;y>=0;--y)if(z[y].c===b)return y
return-1},
ir:function(a,b){var z,y,x,w
for(z=this.a,y=z.length,x="",w=0;w<z.length;z.length===y||(0,H.v)(z),++w)x+=z[w].h(0)+b
return x},
h:function(a){return this.ir(a,"\n")}},kj:{"^":"a2;a,b,c,d",
h:function(a){return"Uniform1i: "+H.c(this.c)}},km:{"^":"a2;a,b,c,d",
h:function(a){return"Uniform2i: "+H.c(this.c)}},kn:{"^":"a2;a,b,c,d",
h:function(a){return"Uniform3i: "+H.c(this.c)}},kp:{"^":"a2;a,b,c,d",
h:function(a){return"Uniform4i: "+H.c(this.c)}},kk:{"^":"a2;e,f,a,b,c,d",
h:function(a){return"Uniform1iv: "+H.c(this.c)},
f0:function(a,b,c,d,e){this.f=d
this.e=P.j2(d,0,!1,P.n)},
n:{
d1:function(a,b,c,d,e){var z=new A.kk(null,null,a,b,c,e)
z.f0(a,b,c,d,e)
return z}}},d0:{"^":"a2;a,b,c,d",
h:function(a){return"Uniform1f: "+H.c(this.c)}},kl:{"^":"a2;a,b,c,d",
h:function(a){return"Uniform2f: "+H.c(this.c)}},d2:{"^":"a2;a,b,c,d",
h:function(a){return"Uniform3f: "+H.c(this.c)}},ko:{"^":"a2;a,b,c,d",
h:function(a){return"Uniform4f: "+H.c(this.c)}},kr:{"^":"a2;a,b,c,d",
h:function(a){return"Uniform1Mat2 "+H.c(this.c)}},ks:{"^":"a2;a,b,c,d",
h:function(a){return"UniformMat3: "+H.c(this.c)}},d3:{"^":"a2;a,b,c,d",
d6:function(a){var z=new Float32Array(H.dg(a))
J.hB(this.a,this.d,!1,z)},
h:function(a){return"UniformMat4: "+H.c(this.c)}},kt:{"^":"a2;a,b,c,d",
h:function(a){return"UniformSampler2D: "+H.c(this.c)}},ku:{"^":"a2;a,b,c,d",
h:function(a){return"UniformSamplerCube: "+H.c(this.c)}}}],["","",,F,{"^":"",
cc:function(a){var z=J.bR(a.a,0)?1:0
if(J.bR(a.b,0))z+=2
return(J.bR(a.c,0)?z+4:z)*2},
bt:function(a,b,c,d,e,f,g,h,i){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z={}
y=f+g
x=y+h
w=g+h
v=h+f
u=new V.H(null,null,null)
u.a=x
u.b=w+f
u.c=v+g
z.a=u
t=f-g
s=g-h
r=h-f
q=new V.H(null,null,null)
q.a=t+h
q.b=s+f
q.c=r+g
z.b=q
p=new V.H(null,null,null)
p.a=t-h
p.b=s-f
p.c=r-g
z.c=p
o=new V.H(null,null,null)
o.a=y-h
o.b=w-f
o.c=v-g
z.d=o
if(x>0){z.d=q
z.b=o
x=q
y=o}else{x=o
y=q}for(v=x,x=y,y=u,w=p,n=0;n<i;++n,m=v,v=y,y=x,x=w,w=m){z.a=x
z.b=w
z.c=v
z.d=y}l=F.n2(d,e,new F.mf(z,c,F.cc(y),F.cc(z.b),F.cc(z.c),F.cc(z.d)),b)
if(l!=null)a.i0(l)},
n2:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
if(a<1)return
if(b<1)return
z=F.eG()
y=H.e([],[F.bL])
for(x=0;x<=b;++x){w=x/b
v=z.a
u=new V.an(null,null)
u.a=w
u.b=1
t=new V.aw(null,null,null,null)
if(w<0)s=0
else s=w>1?1:w
t.a=s
t.b=0
t.c=0
t.d=1
v.toString
r=F.d6(null,null,t,null,null,u,null,null,0)
v.p(0,r)
c.$3(r,w,0)
y.push(r.cK(d))}for(x=1;x<=a;++x){q=x/a
for(v=q>1,u=q<0,t=1-q,p=0;p<=b;++p){w=p/b
s=z.a
o=new V.an(null,null)
o.a=w
o.b=t
n=new V.aw(null,null,null,null)
if(w<0)m=0
else m=w>1?1:w
n.a=m
if(u)m=0
else m=v?1:q
n.b=m
if(u)m=0
else m=v?1:q
n.c=m
n.d=1
s.toString
r=F.d6(null,null,n,null,null,o,null,null,0)
s.p(0,r)
c.$3(r,w,q)
y.push(r.cK(d))}}z.d.h3(a+1,b+1,y)
return z},
aJ:{"^":"b;a,b,c,d,e",
gcM:function(){return this.a==null||this.b==null||this.c==null},
gaw:function(){return this.a},
gb7:function(){return this.b},
geo:function(){return this.c},
gaL:function(){return this.d},
f9:function(){var z,y,x,w
z=this.a
z=z==null?z:z.gaL()
y=this.b
y=y==null?y:y.gaL()
x=this.c
x=x==null?x:x.gaL()
w=new V.H(null,null,null)
w.a=0
w.b=0
w.c=0
if(z!=null)w=w.t(0,z)
if(y!=null)w=w.t(0,y)
if(x!=null)w=w.t(0,x)
if(w.hV())return
return w.Y(0,Math.sqrt(H.T(w.a3(w))))},
fa:function(){var z,y,x,w,v,u,t,s
z=this.a
z=z==null?z:J.cr(z)
y=this.b
y=y==null?y:J.cr(y)
x=this.c
x=x==null?x:J.cr(x)
if(z==null||y==null||x==null)return
w=J.B(y,z)
v=J.m(w)
u=v.gu(w)
t=v.gv(w)
w=v.gb8(w)
v=new V.H(null,null,null)
v.a=u
v.b=t
v.c=w
s=v.Y(0,Math.sqrt(H.T(v.a3(v))))
v=J.B(x,z)
w=J.m(v)
t=w.gu(v)
u=w.gv(v)
v=w.gb8(v)
w=new V.H(null,null,null)
w.a=t
w.b=u
w.c=v
w=s.cL(w.Y(0,Math.sqrt(H.T(w.a3(w)))))
return w.Y(0,Math.sqrt(H.T(w.a3(w))))},
cF:function(){var z,y
if(this.d!=null)return!0
z=this.f9()
if(z==null){z=this.fa()
if(z==null)return!1}this.d=z
y=this.a.ga5()
y.e.S(new E.O(y))
return!0},
w:function(a,b){if(b==null)return!1
return this===b},
A:function(a,b){var z,y
if(this.gcM())return b+"disposed"
z=b+C.a.ad(J.C(this.a.gas()),0)+", "+C.a.ad(J.C(this.b.gas()),0)+", "+C.a.ad(J.C(this.c.gas()),0)+" {"
y=this.d
z=y!=null?z+(J.C(y)+", "):z+"-, "
return z+"-}"},
h:function(a){return this.A(a,"")}},
bl:{"^":"b;a,b",
gcM:function(){return this.a==null||this.b==null},
gaw:function(){return this.a},
gb7:function(){return this.b},
w:function(a,b){if(b==null)return!1
return this===b},
A:function(a,b){if(this.gcM())return b+"disposed"
return b+C.a.ad(J.C(this.a.gas()),0)+", "+C.a.ad(J.C(this.b.gas()),0)},
h:function(a){return this.A(a,"")}},
cR:{"^":"b;a",
gbB:function(){return this.a},
w:function(a,b){if(b==null)return!1
return this===b},
A:function(a,b){var z=this.a
if(z==null)return b+"disposed"
return b+C.a.ad(J.C(z.gas()),0)},
h:function(a){return this.A(a,"")},
eS:function(a){var z
if(a==null)throw H.a(P.F("May not create a point with a null vertex."))
if(J.bU(a)==null)throw H.a(P.F("May not create a point with a vertex which is not attached to a shape."))
this.a=a
a.gbh().gbh().push(this)
this.a.ga5().b.b.push(this)
z=this.a.ga5()
z.e.S(new E.O(z))},
n:{
eu:function(a){var z=new F.cR(null)
z.eS(a)
return z}}},
jF:{"^":"b;a,bh:b<,bJ:c<,be:d<,e",
i0:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l;++this.e.c
a.a.bO()
z=this.a.c.length
for(y=a.a.c,x=y.length,w=0;w<y.length;y.length===x||(0,H.v)(y),++w){v=y[w]
this.a.p(0,v.ab())}this.a.bO()
for(y=a.b.b,x=y.length,w=0;w<y.length;y.length===x||(0,H.v)(y),++w){u=y[w]
t=this.a
s=J.a8(u.gbB())
if(typeof s!=="number")return s.t()
s+=z
t=t.c
if(s<0||s>=t.length)return H.d(t,s)
r=t[s]
this.b.a.a.p(0,r)
F.eu(r)}for(y=a.c.b,x=y.length,w=0;w<y.length;y.length===x||(0,H.v)(y),++w){q=y[w]
t=this.a
s=J.a8(q.gaw())
if(typeof s!=="number")return s.t()
s+=z
t=t.c
if(s<0||s>=t.length)return H.d(t,s)
p=t[s]
s=this.a
t=J.a8(q.gb7())
if(typeof t!=="number")return t.t()
t+=z
s=s.c
if(t<0||t>=s.length)return H.d(s,t)
o=s[t]
t=this.c
t.a.a.p(0,p)
t.a.a.p(0,o)
t=new F.bl(null,null)
if(p==null)H.p(P.F("May not create a line with a null start vertex."))
if(o==null)H.p(P.F("May not create a line with a null end vertex."))
s=J.m(p)
if(s.ga_(p)==null)H.p(P.F("May not create a line with a start vertex which is not attached to a shape."))
s=s.ga_(p)
n=J.bU(o)
if(s==null?n!=null:s!==n)H.p(P.F("May not create a line with vertices attached to different shapes."))
t.a=p
p.gbJ().gfw().push(t)
t.b=o
o.gbJ().gfz().push(t)
t.a.ga5().c.b.push(t)
t=t.a.ga5()
t.e.S(new E.O(t))}for(y=a.d.b,x=y.length,w=0;w<y.length;y.length===x||(0,H.v)(y),++w){m=y[w]
t=this.a
s=J.a8(m.gaw())
if(typeof s!=="number")return s.t()
s+=z
t=t.c
if(s<0||s>=t.length)return H.d(t,s)
p=t[s]
s=this.a
t=J.a8(m.gb7())
if(typeof t!=="number")return t.t()
t+=z
s=s.c
if(t<0||t>=s.length)return H.d(s,t)
o=s[t]
t=this.a
s=J.a8(m.geo())
if(typeof s!=="number")return s.t()
s+=z
t=t.c
if(s<0||s>=t.length)return H.d(t,s)
l=t[s]
this.d.bm(0,p,o,l)}this.e.b3()},
hb:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=this.a.c.length
b.toString
y=$.$get$ag()
x=b.a
w=(x&y.a)>>>0!==0?1:0
if((x&$.$get$aC().a)>>>0!==0)++w
if((x&$.$get$aB().a)>>>0!==0)++w
if((x&$.$get$aD().a)>>>0!==0)++w
if((x&$.$get$aE().a)>>>0!==0)++w
if((x&$.$get$aS().a)>>>0!==0)++w
if((x&$.$get$aT().a)>>>0!==0)++w
if((x&$.$get$aF().a)>>>0!==0)++w
if((x&$.$get$aA().a)>>>0!==0)++w
v=b.gd8(b)
y=new Array(z*v)
y.fixed$length=Array
u=H.e(y,[P.Z])
t=H.e(new Array(w),[Z.dL])
for(y=u.length,x=v*4,s=t.length,r=0,q=0;q<w;++q){p=b.h7(q)
o=p.gd8(p)
if(q>=s)return H.d(t,q)
t[q]=new Z.dL(p,o,r*4,x,0)
for(n=0;n<z;++n){m=this.a.c
if(n>=m.length)return H.d(m,n)
l=m[n].i_(p)
k=r+n*v
for(m=l.length,j=0;j<m;++j){i=l[j]
if(k<0||k>=y)return H.d(u,k)
u[k]=i;++k}}r+=o}y=a.a
h=J.ds(y)
y.bindBuffer(34962,h)
y.bufferData(34962,new Float32Array(H.dg(u)),35044)
y.bindBuffer(34962,null)
g=new Z.dM(new Z.fk(34962,h),null,t,b)
g.b=H.e([],[Z.bY])
if(this.b.b.length!==0){f=H.e([],[P.n])
for(q=0;x=this.b.b,q<x.length;++q)f.push(J.a8(x[q].gbB()))
e=Z.d7(y,34963,f)
g.b.push(new Z.bY(0,f.length,e))}if(this.c.b.length!==0){f=H.e([],[P.n])
for(q=0;x=this.c.b,q<x.length;++q){f.push(J.a8(x[q].gaw()))
x=this.c.b
if(q>=x.length)return H.d(x,q)
f.push(J.a8(x[q].gb7()))}e=Z.d7(y,34963,f)
g.b.push(new Z.bY(1,f.length,e))}if(this.d.b.length!==0){f=H.e([],[P.n])
for(q=0;x=this.d.b,q<x.length;++q){f.push(J.a8(x[q].gaw()))
x=this.d.b
if(q>=x.length)return H.d(x,q)
f.push(J.a8(x[q].gb7()))
x=this.d.b
if(q>=x.length)return H.d(x,q)
f.push(J.a8(x[q].geo()))}e=Z.d7(y,34963,f)
g.b.push(new Z.bY(4,f.length,e))}return g},
A:function(a,b){var z=H.e([],[P.o])
if(this.a.c.length!==0){z.push(b+"Vertices:")
z.push(J.ai(this.a,b+"   "))}if(this.b.b.length!==0){z.push(b+"Points:")
z.push(J.ai(this.b,b+"   "))}if(this.c.b.length!==0){z.push(b+"Lines:")
z.push(J.ai(this.c,b+"   "))}if(this.d.b.length!==0){z.push(b+"Faces:")
z.push(J.ai(this.d,b+"   "))}return C.b.P(z,"\n")},
h:function(a){return this.A(a,"")},
eW:function(){var z=new F.kY(this,null,null)
z.b=!1
z.c=H.e([],[F.bL])
this.a=z
z=new F.jI(this,null)
z.b=H.e([],[F.cR])
this.b=z
z=new F.jH(this,null)
z.b=H.e([],[F.bl])
this.c=z
z=new F.jG(this,null)
z.b=H.e([],[F.aJ])
this.d=z
this.e=E.ad()},
n:{
eG:function(){var z=new F.jF(null,null,null,null,null)
z.eW()
return z}}},
mf:{"^":"f:14;a,b,c,d,e,f",
$3:function(a,b,c){var z,y,x,w,v
z=this.a
y=z.a.cT(z.b,b).cT(z.d.cT(z.c,b),c)
z=y.a
x=y.b
w=y.c
v=new V.aO(null,null,null)
v.a=z
v.b=x
v.c=w
if(!J.E(a.f,v)){a.f=v
z=a.a
if(z!=null)z.e.S(new E.O(z))}z=y.Y(0,Math.sqrt(H.T(y.a3(y))))
if(!J.E(a.z,z)){a.z=z
z=a.a
if(z!=null)z.e.S(new E.O(z))}z=1-b
x=1-c
w=new V.b0(null,null,null,null)
w.W(this.e+b*c,this.f+z*c,this.d+b*x,this.c+z*x)
if(!J.E(a.cx,w)){a.cx=w
z=a.a
if(z!=null)z.e.S(new E.O(z))}}},
jG:{"^":"b;a5:a<,be:b<",
ga_:function(a){return this.a},
bm:function(a,b,c,d){var z,y,x,w
this.a.a.p(0,b)
this.a.a.p(0,c)
this.a.a.p(0,d)
z=new F.aJ(null,null,null,null,null)
if(b==null)H.p(P.F("May not create a face with a null first vertex."))
if(c==null)H.p(P.F("May not create a face with a null second vertex."))
if(d==null)H.p(P.F("May not create a face with a null third vertex."))
y=J.m(b)
if(y.ga_(b)==null)H.p(P.F("May not create a face with a first vertex which is not attached to a shape."))
x=y.ga_(b)
w=J.bU(c)
if(x==null?w==null:x===w){y=y.ga_(b)
x=J.bU(d)
x=y==null?x!=null:y!==x
y=x}else y=!0
if(y)H.p(P.F("May not create a face with vertices attached to different shapes."))
z.d=null
z.e=null
z.a=b
b.gbe().gfn().push(z)
z.b=c
c.gbe().gfo().push(z)
z.c=d
d.gbe().gfp().push(z)
z.a.ga5().d.b.push(z)
y=z.a.ga5()
y.e.S(new E.O(y))
return z},
h3:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=H.e([],[F.aJ])
for(y=b,x=0,w=!1,v=1;v<a;++v,++x,++y){for(u=w,t=1;t<b;++t,y=p){s=c.length
if(x<0||x>=s)return H.d(c,x)
r=c[x];++x
if(x>=s)return H.d(c,x)
q=c[x]
p=y+1
if(p<0||p>=s)return H.d(c,p)
o=c[p]
if(y<0||y>=s)return H.d(c,y)
n=c[y]
if(u){z.push(this.bm(0,r,q,o))
z.push(this.bm(0,r,o,n))}else{z.push(this.bm(0,q,o,n))
z.push(this.bm(0,q,n,r))}u=!u}w=!w}return z},
gE:function(a){return this.b.length===0},
gk:function(a){return this.b.length},
j:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.d(z,b)
return z[b]},
K:function(a,b){return C.b.K(this.b,b)},
B:function(a,b){return C.b.B(this.b,b)},
cG:function(){var z,y,x,w
for(z=this.b,y=z.length,x=!0,w=0;w<z.length;z.length===y||(0,H.v)(z),++w)if(!z[w].cF())x=!1
return x},
A:function(a,b){var z,y,x,w
z=H.e([],[P.o])
for(y=this.b,x=y.length,w=0;w<y.length;y.length===x||(0,H.v)(y),++w)z.push(J.ai(y[w],b))
return C.b.P(z,"\n")},
h:function(a){return this.A(a,"")}},
jH:{"^":"b;a5:a<,bJ:b<",
ga_:function(a){return this.a},
gE:function(a){return this.b.length===0},
gk:function(a){return this.b.length},
j:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.d(z,b)
return z[b]},
K:function(a,b){return C.b.K(this.b,b)},
B:function(a,b){return C.b.B(this.b,b)},
A:function(a,b){var z,y,x,w,v
z=H.e([],[P.o])
y=this.b.length
for(x=0;x<y;++x){w=this.b
if(x>=w.length)return H.d(w,x)
v=w[x]
if(v==null)z.push(b+x+". null")
else z.push(J.ai(v,b+(""+x+". ")))}return C.b.P(z,"\n")},
h:function(a){return this.A(a,"")}},
jI:{"^":"b;a5:a<,bh:b<",
ga_:function(a){return this.a},
p:function(a,b){this.a.a.p(0,b)
return F.eu(b)},
gE:function(a){return this.b.length===0},
gk:function(a){return this.b.length},
j:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.d(z,b)
return z[b]},
K:function(a,b){return C.b.K(this.b,b)},
B:function(a,b){return C.b.B(this.b,b)},
A:function(a,b){var z,y,x,w
z=H.e([],[P.o])
for(y=this.b,x=y.length,w=0;w<y.length;y.length===x||(0,H.v)(y),++w)z.push(J.ai(y[w],b))
return C.b.P(z,"\n")},
h:function(a){return this.A(a,"")}},
bL:{"^":"b;a5:a<,bh:b<,bJ:c<,be:d<,as:e@,f,r,x,y,z,Q,ch,cx",
cK:function(a){var z,y,x,w,v,u,t,s,r
z=this.f
if(z==null);else{y=z.a
x=z.b
z=z.c
w=new V.aO(null,null,null)
w.a=y
w.b=x
w.c=z
z=w}y=this.r
if(y==null);else{x=y.a
w=y.b
y=y.c
v=new V.H(null,null,null)
v.a=x
v.b=w
v.c=y
y=v}x=this.x
w=this.y
if(w==null);else{v=w.a
w=w.b
u=new V.an(null,null)
u.a=v
u.b=w
w=u}v=this.z
if(v==null);else{u=v.a
t=v.b
v=v.c
s=new V.H(null,null,null)
s.a=u
s.b=t
s.c=v
v=s}u=this.Q
if(u==null);else{t=new V.aw(null,null,null,null)
t.W(u.a,u.b,u.c,u.d)
u=t}t=this.ch
s=this.cx
if(s==null);else{r=new V.b0(null,null,null,null)
r.W(s.a,s.b,s.c,s.d)
s=r}return F.d6(s,x,u,z,y,w,v,a,t)},
ab:function(){return this.cK(null)},
ga_:function(a){return this.a},
gcR:function(a){this.a.a.bO()
return this.e},
gE:function(a){var z
if(this.b.b.length===0){z=this.c
if(z.b.length===0&&z.c.length===0){z=this.d
z=z.gE(z)}else z=!1}else z=!1
return z},
gbX:function(a){return this.f},
gaL:function(){return this.r},
i_:function(a){var z=$.$get$ag()
if(a==null?z==null:a===z){z=this.f
if(z==null)return[0,0,0]
else return[z.a,z.b,z.c]}else{z=$.$get$aC()
if(a==null?z==null:a===z){z=this.r
if(z==null)return[0,1,0]
else return[z.a,z.b,z.c]}else{z=$.$get$aB()
if(a==null?z==null:a===z)return[0,0,1]
else{z=$.$get$aD()
if(a==null?z==null:a===z){z=this.y
if(z==null)return[0,0]
else return[z.a,z.b]}else{z=$.$get$aE()
if(a==null?z==null:a===z){z=this.z
if(z==null)return[0,0,0]
else return[z.a,z.b,z.c]}else{z=$.$get$aS()
if(a==null?z==null:a===z){z=this.Q
if(z==null)return[1,1,1]
else return[z.a,z.b,z.c]}else{z=$.$get$aT()
if(a==null?z==null:a===z){z=this.Q
if(z==null)return[1,1,1,1]
else return[z.a,z.b,z.c,z.d]}else{z=$.$get$aF()
if(a==null?z==null:a===z)return[this.ch]
else{z=$.$get$aA()
if(a==null?z==null:a===z){z=this.cx
if(z==null)return[-1,-1,-1,-1]
else return[z.a,z.b,z.c,z.d]}else return[]}}}}}}}}},
cF:function(){var z,y,x
z={}
if(this.r!=null)return!0
y=this.a
if(y!=null)++y.e.c
x=new V.H(null,null,null)
x.a=0
x.b=0
x.c=0
z.a=x
this.d.B(0,new F.l4(z))
z=z.a
this.r=z.Y(0,Math.sqrt(H.T(z.a3(z))))
z=this.a
if(z!=null){z.e.S(new E.O(z))
this.a.e.b3()}return!0},
w:function(a,b){if(b==null)return!1
return this===b},
A:function(a,b){var z,y,x
z=H.e([],[P.o])
z.push(C.a.ad(J.C(this.e),0))
y=this.f
if(y!=null)z.push(J.C(y))
else z.push("-")
y=this.r
if(y!=null)z.push(J.C(y))
else z.push("-")
z.push("-")
y=this.y
if(y!=null)z.push(J.C(y))
else z.push("-")
y=this.z
if(y!=null)z.push(J.C(y))
else z.push("-")
y=this.Q
if(y!=null)z.push(J.C(y))
else z.push("-")
z.push(V.G(this.ch,3,0))
y=this.cx
if(y!=null)z.push(J.C(y))
else z.push("-")
x=C.b.P(z,", ")
return b+"{"+x+"}"},
h:function(a){return this.A(a,"")},
f1:function(a,b,c,d,e,f,g,h,i){var z,y
this.a=null
z=new F.l3(this,null)
z.b=H.e([],[F.cR])
this.b=z
z=new F.l1(this,null,null)
z.b=H.e([],[F.bl])
z.c=H.e([],[F.bl])
this.c=z
z=new F.kZ(this,null,null,null)
z.b=H.e([],[F.aJ])
z.c=H.e([],[F.aJ])
z.d=H.e([],[F.aJ])
this.d=z
h=$.$get$fh()
this.e=0
z=$.$get$ag()
y=h.a
this.f=(y&z.a)>>>0!==0?d:null
this.r=(y&$.$get$aC().a)>>>0!==0?e:null
this.x=(y&$.$get$aB().a)>>>0!==0?b:null
this.y=(y&$.$get$aD().a)>>>0!==0?f:null
this.z=(y&$.$get$aE().a)>>>0!==0?g:null
this.Q=(y&$.$get$fi().a)>>>0!==0?c:null
this.ch=(y&$.$get$aF().a)>>>0!==0?i:0
this.cx=(y&$.$get$aA().a)>>>0!==0?a:null},
n:{
d6:function(a,b,c,d,e,f,g,h,i){var z=new F.bL(null,null,null,null,null,null,null,null,null,null,null,null,null)
z.f1(a,b,c,d,e,f,g,h,i)
return z}}},
l4:{"^":"f:6;a",
$1:function(a){var z,y
z=a==null?a:a.gaL()
if(z!=null){y=this.a
y.a=y.a.t(0,z)}}},
kY:{"^":"b;a5:a<,b,c",
bO:function(){var z,y,x,w,v
if(this.b){z=this.c.length
for(y=0,x=0;x<z;++x){w=this.c
if(x>=w.length)return H.d(w,x)
v=w[x]
if(v==null){C.b.ib(w,x);--z}else{v.sas(y);++y}}this.b=!1}},
p:function(a,b){var z,y
z=J.m(b)
if(z.ga_(b)!=null){z=z.ga_(b)
y=this.a
if(z==null?y==null:z===y)return!1
throw H.a(P.F("May not add a vertex already attached to another shape to this shape."))}b.sas(this.c.length)
b.a=this.a
this.c.push(b)
z=this.a
z.e.S(new E.O(z))
return!0},
gE:function(a){return this.c.length===0},
gk:function(a){return this.c.length},
j:function(a,b){var z=this.c
if(b>>>0!==b||b>=z.length)return H.d(z,b)
return z[b]},
K:function(a,b){return C.b.K(this.c,b)},
B:function(a,b){return C.b.B(this.c,b)},
cG:function(){var z,y,x,w
for(z=this.c,y=z.length,x=!0,w=0;w<z.length;z.length===y||(0,H.v)(z),++w)if(!z[w].cF())x=!1
return x},
A:function(a,b){var z,y,x,w
this.bO()
z=H.e([],[P.o])
for(y=this.c,x=y.length,w=0;w<y.length;y.length===x||(0,H.v)(y),++w)z.push(J.ai(y[w],b))
return C.b.P(z,"\n")},
h:function(a){return this.A(a,"")}},
kZ:{"^":"b;a,fn:b<,fo:c<,fp:d<",
gbB:function(){return this.a},
ga_:function(a){return this.a.a},
gE:function(a){return this.b.length===0&&this.c.length===0&&this.d.length===0},
gk:function(a){return this.b.length+this.c.length+this.d.length},
j:function(a,b){var z,y,x
z=this.b
y=z.length
if(typeof b!=="number")return b.H()
if(b<y){if(b<0||b>=y)return H.d(z,b)
return z[b]}b-=y
z=this.c
x=z.length
if(b<x)return z[b]
b-=x
z=this.d
if(b<0||b>=z.length)return H.d(z,b)
return z[b]},
K:function(a,b){var z=C.b.K(this.b,b)
if(z>=0)return z
z=C.b.K(this.c,b)
if(z>=0)return z+this.b.length
z=C.b.K(this.d,b)
if(z>=0)return z+this.b.length+this.c.length
return-1},
B:function(a,b){C.b.B(this.b,b)
C.b.B(this.c,new F.l_(this,b))
C.b.B(this.d,new F.l0(this,b))},
A:function(a,b){var z,y,x,w
z=H.e([],[P.o])
for(y=this.b,x=y.length,w=0;w<y.length;y.length===x||(0,H.v)(y),++w)z.push(y[w].A(0,b))
for(y=this.c,x=y.length,w=0;w<y.length;y.length===x||(0,H.v)(y),++w)z.push(y[w].A(0,b))
for(y=this.d,x=y.length,w=0;w<y.length;y.length===x||(0,H.v)(y),++w)z.push(y[w].A(0,b))
return C.b.P(z,"\n")},
h:function(a){return this.A(a,"")}},
l_:{"^":"f:6;a,b",
$1:function(a){if(!J.E(a.gaw(),this.a))this.b.$1(a)}},
l0:{"^":"f:6;a,b",
$1:function(a){var z=this.a
if(!J.E(a.gaw(),z)&&!J.E(a.gb7(),z))this.b.$1(a)}},
l1:{"^":"b;a,fw:b<,fz:c<",
gbB:function(){return this.a},
ga_:function(a){return this.a.a},
gE:function(a){return this.b.length===0&&this.c.length===0},
gk:function(a){return this.b.length+this.c.length},
j:function(a,b){var z,y,x
z=this.b
y=z.length
if(typeof b!=="number")return b.bD()
if(b>=y){z=this.c
x=b-y
if(x>=z.length)return H.d(z,x)
return z[x]}else{if(b<0||b>=y)return H.d(z,b)
return z[b]}},
K:function(a,b){var z=C.b.K(this.b,b)
if(z>=0)return z
z=C.b.K(this.c,b)
if(z>=0)return z+this.b.length
return-1},
B:function(a,b){C.b.B(this.b,b)
C.b.B(this.c,new F.l2(this,b))},
A:function(a,b){var z,y,x,w
z=H.e([],[P.o])
for(y=this.b,x=y.length,w=0;w<y.length;y.length===x||(0,H.v)(y),++w)z.push(y[w].A(0,b))
for(y=this.c,x=y.length,w=0;w<y.length;y.length===x||(0,H.v)(y),++w)z.push(y[w].A(0,b))
return C.b.P(z,"\n")},
h:function(a){return this.A(a,"")}},
l2:{"^":"f:16;a,b",
$1:function(a){if(!J.E(a.gaw(),this.a))this.b.$1(a)}},
l3:{"^":"b;a,bh:b<",
gbB:function(){return this.a},
ga_:function(a){return this.a.a},
gE:function(a){return this.b.length===0},
gk:function(a){return this.b.length},
j:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.d(z,b)
return z[b]},
K:function(a,b){return C.b.K(this.b,b)},
B:function(a,b){return C.b.B(this.b,b)},
A:function(a,b){var z,y,x,w
z=H.e([],[P.o])
for(y=this.b,x=y.length,w=0;w<y.length;y.length===x||(0,H.v)(y),++w)z.push(J.ai(y[w],b))
return C.b.P(z,"\n")},
h:function(a){return this.A(a,"")}}}],["","",,O,{"^":"",i1:{"^":"eQ;a,b,c,d,e",
se8:function(a){this.b=a
return a},
sdZ:function(a){this.c=a
return a},
se_:function(a){this.d=a
return a},
se0:function(a){this.e=a
return a},
d1:function(a){}},eQ:{"^":"b;"}}],["","",,T,{"^":"",k9:{"^":"b;a,b,c,d,e"}}],["","",,V,{"^":"",hE:{"^":"b;",
b1:function(a){return!0},
h:function(a){return"all"}},cK:{"^":"b;"},ei:{"^":"b;",
b1:["eK",function(a){var z,y,x
for(z=this.a,y=z.length,x=0;x<z.length;z.length===y||(0,H.v)(z),++x)if(z[x].b1(a))return!0
return!1}],
p:function(a,b){this.a.push(b)
return b},
l:function(a){var z=V.jD(new H.dS(a))
this.a.push(z)
return z},
N:function(a,b){var z,y,x,w
if(a.length!==1||b.length!==1)H.p(P.F("The given low and high character strings for a RangeMatcher must have one and only one characters."))
z=C.a.q(a,0)
y=C.a.q(b,0)
x=new V.jp(null,null)
if(z>y){w=y
y=z
z=w}x.a=z
x.b=y
this.a.push(x)
return x},
h1:function(a){var z=new V.hE()
this.a.push(z)
return z},
a7:function(){var z=new V.jg(null)
z.a=H.e([],[V.cK])
this.a.push(z)
return z},
h:["da",function(a){var z,y,x,w,v
for(z=this.a,y=z.length,x="",w=0;w<z.length;z.length===y||(0,H.v)(z),++w){v=z[w]
if(x.length!==0)x+=", "
x+=v.h(0)}return x}]},jg:{"^":"ei;a",
b1:function(a){return!this.eK(a)},
h:function(a){return"!["+this.da(this)+"]"}},jp:{"^":"b;a,b",
b1:function(a){return this.a<=a&&this.b>=a},
h:function(a){var z,y
z=H.aQ(this.a)
y=H.aQ(this.b)
return z+".."+y}},jC:{"^":"b;a",
b1:function(a){return this.a.bU(a)},
h:function(a){return P.bJ(this.a.gal(),0,null)},
eU:function(a){var z,y
if(a.a.length<=0)throw H.a(P.F("May not create a SetMatcher with zero characters."))
z=H.e(new H.a9(0,null,null,null,null,null,0),[P.n,P.b6])
for(y=a.gI(a);y.m();)z.F(0,y.d,!0)
this.a=z},
n:{
jD:function(a){var z=new V.jC(null)
z.eU(a)
return z}}},eK:{"^":"b;a,b,c,d",
gG:function(a){return this.b},
gd_:function(){return this.d},
L:function(a){var z=this.a.it(a)
this.d=z
return z},
P:function(a,b){var z,y,x,w
for(z=this.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.v)(z),++x){w=z[x]
if(J.E(J.cs(w.gio(w)),b))return w}w=new V.eV(this.a.i(0,b),null,null)
w.a=H.e([],[V.cK])
w.c=!1
this.c.push(w)
return w},
hI:function(a){var z,y,x,w
for(z=this.c,y=z.length,x=0;x<z.length;z.length===y||(0,H.v)(z),++x){w=z[x]
if(w.b1(a))return w}return},
h:function(a){return this.b}},eU:{"^":"b;G:a>,b,cR:c>",
h:function(a){var z,y
H.aV("\\n")
z=H.dq(this.b,"\n","\\n")
H.aV("\\t")
y=H.dq(z,"\t","\\t")
return H.c(this.a)+":"+this.c+':"'+y+'"'}},c4:{"^":"b;a,b,c",
aN:function(a,b,c){var z,y,x
for(z=c.length,y=0;y<c.length;c.length===z||(0,H.v)(c),++y){x=c[y]
this.c.F(0,x,b)}},
ew:function(a,b){var z=this.c.j(0,a)
return new V.eU(z==null?this.b:z,a,b)},
h:function(a){return this.b}},kh:{"^":"b;a,b,c",
i:function(a,b){var z=this.a.j(0,b)
if(z==null){z=new V.eK(this,b,null,null)
z.c=H.e([],[V.eV])
z.d=null
this.a.F(0,b,z)}return z},
it:[function(a){var z=this.b.j(0,a)
if(z==null){z=new V.c4(this,a,null)
z.c=H.e(new H.a9(0,null,null,null,null,null,0),[P.o,P.o])
this.b.F(0,a,z)}return z},"$1","gd_",2,0,17],
c2:function(a){var z,y,x,w,v,u,t,s,r
z=H.e([],[V.eU])
y=this.c
x=[]
for(w=a.length,v=null,u=0;!0;){if(u>=w){if(v!=null)z.push(v)
return z}t=C.a.q(a,u)
s=y.hI(t)
if(s==null){if(v==null){x.push(t)
r=P.bJ(x,0,null)
throw H.a(P.F("Untokenizable string [state: "+y.gG(y)+", index "+u+']: "'+r+'"'))}z.push(v)
u=v.c+1
x=[]
y=this.c
v=null}else{if(!s.ga4())x.push(t)
y=s.b
if(y.gd_()!=null){r=P.bJ(x,0,null)
v=y.gd_().ew(r,u)}++u}}},
f_:function(){this.a=H.e(new H.a9(0,null,null,null,null,null,0),[P.o,V.eK])
this.b=H.e(new H.a9(0,null,null,null,null,null,0),[P.o,V.c4])
this.c=null},
n:{
c5:function(){var z=new V.kh(null,null,null)
z.f_()
return z}}},eV:{"^":"ei;b,c,a",
gio:function(a){return this.b},
ga4:function(){return this.c},
sa4:function(a){this.c=!0},
h:function(a){return H.c(J.cs(this.b))+": "+this.da(this)},
$iscK:1}}],["","",,X,{"^":"",iq:{"^":"k8;a,b,c,d,e,f,r",
a2:function(a){var z,y,x,w,v,u,t
J.h9(a.a,36160,null)
J.du(a.a,2884)
J.du(a.a,2929)
J.hh(a.a,513)
z=J.hl(a.a)
y=J.hk(a.a)
x=this.r.a
if(typeof x!=="number")return x.D()
if(typeof z!=="number")return H.t(z)
w=C.c.ae(x*z)
x=this.r.b
if(typeof x!=="number")return x.D()
if(typeof y!=="number")return H.t(y)
v=C.c.ae(x*y)
x=this.r.c
if(typeof x!=="number")return x.D()
a.c=C.c.ae(x*z)
x=this.r.d
if(typeof x!=="number")return x.D()
x=C.c.ae(x*y)
a.d=x
J.hD(a.a,w,v,a.c,x)
if(this.f===!0){J.hd(a.a,this.e)
u=1024}else u=0
if(this.d===!0){J.hc(a.a,this.c)
u|=256}if(this.b===!0){x=a.a
t=this.a
J.hb(x,t.a,t.b,t.c,t.d)
u|=16384}if(u>0)J.ha(a.a,u)},
aO:function(a){},
eO:function(a,b,c,d,e,f,g){var z=new V.aw(null,null,null,null)
z.W(0,0,0,1)
this.a=z
this.b=!0
this.c=e
this.d=!0
this.e=g
this.f=!1
z=new V.bI(null,null,null,null)
z.W(0,0,1,1)
this.r=z},
n:{
ir:function(a,b,c,d,e,f,g){var z=new X.iq(null,null,null,null,null,null,null)
z.eO(!0,!0,!1,d,e,f,g)
return z}}},jj:{"^":"b;a,b,c,d",
a2:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=a.c
y=a.d
x=a.cy
w=this.b
v=this.c
u=this.d
t=u-v
s=1/Math.tan(H.T(w*0.5))
w=new V.af(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
w.af(-s/(z/y),0,0,0,0,s,0,0,0,0,u/t,-u*v/t,0,0,1,0)
x.ec(w)
z=$.et
if(z==null){z=new V.aO(null,null,null)
z.a=0
z.b=0
z.c=0
y=new V.H(null,null,null)
y.a=0
y.b=1
y.c=0
x=new V.H(null,null,null)
x.a=0
x.b=0
x.c=-1
r=x.Y(0,Math.sqrt(H.T(x.a3(x))))
y=y.cL(r)
q=y.Y(0,Math.sqrt(H.T(y.a3(y))))
p=r.cL(q)
y=z.gu(z)
x=z.gv(z)
z=z.gb8(z)
o=new V.H(null,null,null)
o.a=y
o.b=x
o.c=z
n=q.ay(0).a3(o)
m=p.ay(0).a3(o)
l=r.ay(0).a3(o)
z=new V.af(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
z.af(q.a,p.a,r.a,n,q.b,p.b,r.b,m,q.c,p.c,r.c,l,0,0,0,1)
$.et=z
k=z}else k=z
z=this.a
if(z!=null){j=z.a
if(j!=null)k=j.D(0,k)}a.db.ec(k)},
aO:function(a){a.cy.bw()
a.db.bw()},
eR:function(a,b,c,d){this.a=c
this.b=b
this.c=d
this.d=a},
n:{
jk:function(a,b,c,d){var z=new X.jj(null,null,null,null)
z.eR(a,b,c,d)
return z}}},k8:{"^":"cx;"}}],["","",,F,{"^":"",
p0:[function(){var z,y,x,w,v,u,t
try{y=P.kI()
x=y.y
if(x==null){x=y.f
x=H.e(new P.kx(P.kS(x==null?"":x,C.f)),[P.o,P.o])
y.y=x
y=x}else y=x
y=J.as(y.a,"tutorial")
if(J.E(y==null?"":y,"1")){E.n4()
P.bb("FLAG 1")}else{y=V.eH("")
x=document
w=x.createElement("div")
w.className="pageImage"
w.id="3Dart"
v=W.bW(null)
J.bf(v,"#3Dart")
x=document
u=x.createElement("img")
J.hx(u,"resources/ThreeDart.png")
v.appendChild(u)
w.appendChild(v)
y.b.appendChild(w)
y.T(["Currently 3Dart is still in beta."])
y.T(["Please visit the [3Dart GitHub repository|https://github.com/Grant-Nelson/ThreeDart] ","were you can download and play with 3Dart right now. Feel free to help ","develop and contribute to the 3Dart code and community."])
y.aG(2,"Examples")
y.T(["Currently there are no examples written. ","To see 3Dart in action see tests in repository."])
y.aG(2,"Tutorials")
y.T(["[Getting Started|./?tutorial=1]"])
y.dR(6,"Tutorials still need to be written","")
y.T(["Material Lighting"])
y.T(["Advanced Movers"])
y.T(["Advanced Shapes"])
y.T(["Advanced Techniques"])
y.T(["Scene Compositing"])}}catch(t){y=H.D(t)
z=y
P.bb(z)}},"$0","h3",0,0,2]},1],["","",,V,{"^":"",jJ:{"^":"b;a,b,c,d,e,f",
gc_:function(a){return this.b},
dR:function(a,b,c){var z,y,x,w
a=C.c.hc(a,0,4)
if(c.length===0)c=P.d5(C.j,b,C.f,!1)
z=document
y=z.createElement("div")
y.className="textHeader"
y.id=c
z=y.style
x=H.c(28-a*3)+"px"
z.fontSize=x
w=W.bW(null)
J.bf(w,"#"+H.c(c))
w.textContent=b
y.appendChild(w)
this.b.appendChild(y)},
aG:function(a,b){return this.dR(a,b,"")},
T:function(a){var z,y,x,w,v,u,t,s,r,q,p
this.fW()
z=document
y=z.createElement("div")
y.className="textPar"
for(z=this.c.c2(C.b.hX(a)),x=z.length,w=0;w<z.length;z.length===x||(0,H.v)(z),++w){v=z[w]
switch(v.a){case"Bold":u=document
t=u.createElement("div")
t.className="boldPar"
t.textContent=v.b
y.appendChild(t)
break
case"Italic":u=document
t=u.createElement("div")
t.className="italicPar"
t.textContent=v.b
y.appendChild(t)
break
case"Code":u=document
t=u.createElement("div")
t.className="codePar"
t.textContent=v.b
y.appendChild(t)
break
case"Link":u=v.b
if(C.a.a0(u,"|")){s=u.split("|")
u=document
r=u.createElement("a")
r.className="linkPar"
if(1>=s.length)return H.d(s,1)
J.bf(r,s[1])
if(0>=s.length)return H.d(s,0)
r.textContent=s[0]
y.appendChild(r)}else{q=P.d5(C.j,u,C.f,!1)
p=document
r=p.createElement("a")
r.className="linkPar"
J.bf(r,"#"+H.c(q))
r.textContent=u
y.appendChild(r)}break
case"Other":u=document
t=u.createElement("div")
t.className="normalPar"
t.textContent=v.b
y.appendChild(t)
break}}this.b.appendChild(y)},
dP:function(a,b,a0,a1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=[]
for(y=!1,x=0;x<a1.length;++x){w=a1[x]
if(C.a.ap(w,"+")){v=C.a.ba(w,1)
if(x>=a1.length)return H.d(a1,x)
a1[x]=v
z.push(1)
y=!0}else if(C.a.ap(w,"-")){v=C.a.ba(w,1)
if(x>=a1.length)return H.d(a1,x)
a1[x]=v
z.push(-1)
y=!0}else z.push(0)}u=[]
t=C.b.P(a1,"\n")
if(b==="html")this.fe(t,u)
else if(b==="dart")this.fc(t,u)
else if(b==="glsl")this.fd(t,u)
else this.J(t,"#111",u)
v=document
s=v.createElement("div")
s.className="codeTableScroll"
v=document
r=v.createElement("table")
r.className="codeTable"
s.appendChild(r)
this.b.appendChild(s)
q=P.d5(C.j,a,C.f,!1)
v=document
p=v.createElement("tr")
p.className="headerRow"
v=document
o=v.createElement("td")
o.className="headerCell"
J.hv(o,y?3:2)
v=document
n=v.createElement("div")
n.className="tableHeader"
n.id=q
m=W.bW(null)
J.bf(m,"#"+H.c(q))
m.textContent=a
n.appendChild(m)
o.appendChild(n)
p.appendChild(o)
r.appendChild(p)
if(y)for(l=a0,k=l,x=0;x<u.length;++x){w=u[x]
v=document
j=v.createElement("tr")
j.className="codeTableRow"
v=document
i=v.createElement("td")
i.className="codeLineNums codeLineLight"
v=document
h=v.createElement("td")
h.className="codeLineNums"
if(x>=z.length)return H.d(z,x)
g=z[x]
if(g===0){++k;++l
i.textContent=""+k
h.textContent=""+l}else if(g>0){j.className="codeTableRow codeLineLightGreen"
i.className="codeLineNums codeLineGreen codeLineCenter"
h.className="codeLineNums codeLineGreen";++l
i.textContent="+"
h.textContent=""+l}else if(g<0){j.className="codeTableRow codeLineLightRed"
i.className="codeLineNums codeLineRed"
h.className="codeLineNums codeLineRed codeLineCenter";++k
i.textContent=""+k
h.textContent="-"}v=document
f=v.createElement("td")
f.className="codeLineText"
for(v=w.length,e=0;e<w.length;w.length===v||(0,H.v)(w),++e)f.appendChild(w[e])
j.appendChild(i)
j.appendChild(h)
j.appendChild(f)
r.appendChild(j)}else for(v=u.length,d=a0,e=0;e<u.length;u.length===v||(0,H.v)(u),++e){w=u[e]
c=document
j=c.createElement("tr")
j.className="codeTableRow"
c=document
i=c.createElement("td")
i.className="codeLineNums";++d
i.textContent=""+d
c=document
h=c.createElement("td")
h.className="codeLineText"
for(c=C.b.gI(w);c.m();)h.appendChild(c.gC())
j.appendChild(i)
j.appendChild(h)
r.appendChild(j)}},
J:function(a,b,c){var z,y,x,w,v,u,t,s
if(c.length===0)c.push(H.e([],[W.e_]))
z=a.split("\n")
for(y=z.length,x=!0,w=0;w<z.length;z.length===y||(0,H.v)(z),++w){v=z[w]
if(x)x=!1
else c.push(H.e([],[W.e_]))
u=document
t=u.createElement("div")
t.className="codePart"
s=this.a.dm(v,0,J.N(v))
J.hw(t,J.ht(s==null?v:s," ","&nbsp;"))
u=t.style
u.color=b
C.b.gO(c).push(t)}},
fe:function(a,b){var z,y,x,w
this.fV()
for(z=this.d.c2(a),y=z.length,x=0;x<z.length;z.length===y||(0,H.v)(z),++x){w=z[x]
switch(w.a){case"Attr":this.J(w.b,"#911",b)
this.J("=","#111",b)
break
case"Id":this.J(w.b,"#111",b)
break
case"Other":this.J(w.b,"#111",b)
break
case"Reserved":this.J(w.b,"#119",b)
break
case"String":this.J(w.b,"#171",b)
break
case"Symbol":this.J(w.b,"#616",b)
break}}},
fc:function(a,b){var z,y,x,w
this.fT()
for(z=this.e.c2(a),y=z.length,x=0;x<z.length;z.length===y||(0,H.v)(z),++x){w=z[x]
switch(w.a){case"Class":this.J(w.b,"#551",b)
break
case"Comment":this.J(w.b,"#777",b)
break
case"Id":this.J(w.b,"#111",b)
break
case"Num":this.J(w.b,"#191",b)
break
case"Reserved":this.J(w.b,"#119",b)
break
case"String":this.J(w.b,"#171",b)
break
case"Symbol":this.J(w.b,"#616",b)
break
case"Type":this.J(w.b,"#B11",b)
break
case"Whitespace":this.J(w.b,"#111",b)
break}}},
fd:function(a,b){var z,y,x,w
this.fU()
for(z=this.f.c2(a),y=z.length,x=0;x<z.length;z.length===y||(0,H.v)(z),++x){w=z[x]
switch(w.a){case"Builtin":this.J(w.b,"#411",b)
break
case"Comment":this.J(w.b,"#777",b)
break
case"Id":this.J(w.b,"#111",b)
break
case"Num":this.J(w.b,"#191",b)
break
case"Preprocess":this.J(w.b,"#737",b)
break
case"Reserved":this.J(w.b,"#119",b)
break
case"Symbol":this.J(w.b,"#611",b)
break
case"Type":this.J(w.b,"#171",b)
break
case"Whitespace":this.J(w.b,"#111",b)
break}}},
fW:function(){var z,y
if(this.c!=null)return
z=V.c5()
z.c=z.i(0,"Start")
y=J.l(z.i(0,"Start"),"Bold")
y.l("*")
y.sa4(!0)
J.l(z.i(0,"Bold"),"Bold").a7().l("*")
y=J.l(z.i(0,"Bold"),"BoldEnd")
y.l("*")
y.sa4(!0)
y=J.l(z.i(0,"Start"),"Italic")
y.l("_")
y.sa4(!0)
J.l(z.i(0,"Italic"),"Italic").a7().l("_")
y=J.l(z.i(0,"Italic"),"ItalicEnd")
y.l("_")
y.sa4(!0)
y=J.l(z.i(0,"Start"),"Code")
y.l("`")
y.sa4(!0)
J.l(z.i(0,"Code"),"Code").a7().l("`")
y=J.l(z.i(0,"Code"),"CodeEnd")
y.l("`")
y.sa4(!0)
y=J.l(z.i(0,"Start"),"LinkHead")
y.l("[")
y.sa4(!0)
J.l(z.i(0,"LinkHead"),"LinkTail").l("|")
y=J.l(z.i(0,"LinkHead"),"LinkEnd")
y.l("]")
y.sa4(!0)
J.l(z.i(0,"LinkHead"),"LinkHead").a7().l("|]")
y=J.l(z.i(0,"LinkTail"),"LinkEnd")
y.l("]")
y.sa4(!0)
J.l(z.i(0,"LinkTail"),"LinkTail").a7().l("|]")
J.by(J.l(z.i(0,"Start"),"Other"))
J.l(z.i(0,"Other"),"Other").a7().l("*_`[")
z.i(0,"BoldEnd").L("Bold")
z.i(0,"ItalicEnd").L("Italic")
z.i(0,"CodeEnd").L("Code")
z.i(0,"LinkEnd").L("Link")
z.i(0,"Other").L("Other")
this.c=z},
fV:function(){var z,y
if(this.d!=null)return
z=V.c5()
z.c=z.i(0,"Start")
y=J.l(z.i(0,"Start"),"Id")
y.l("_")
y.N("a","z")
y.N("A","Z")
y=J.l(z.i(0,"Id"),"Id")
y.l("_")
y.N("0","9")
y.N("a","z")
y.N("A","Z")
y=J.l(z.i(0,"Id"),"Attr")
y.l("=")
y.sa4(!0)
J.l(z.i(0,"Start"),"Sym").l("</\\-!>=")
J.l(z.i(0,"Sym"),"Sym").l("</\\-!>=")
J.l(z.i(0,"Start"),"OpenStr").l('"')
J.l(z.i(0,"OpenStr"),"CloseStr").l('"')
J.l(z.i(0,"OpenStr"),"EscStr").l("\\")
J.l(z.i(0,"EscStr"),"OpenStr").l('"')
J.by(J.l(z.i(0,"OpenStr"),"OpenStr"))
J.by(J.l(z.i(0,"Start"),"Other"))
y=J.l(z.i(0,"Other"),"Other").a7()
y.l('</\\-!>=_"')
y.N("a","z")
y.N("A","Z")
z.i(0,"Sym").L("Symbol")
z.i(0,"CloseStr").L("String")
J.hs(z.i(0,"Id").L("Id"),"Reserved",["DOCTYPE","html","head","meta","link","title","body","script"])
z.i(0,"Attr").L("Attr")
z.i(0,"Other").L("Other")
this.d=z},
fT:function(){var z,y,x
if(this.e!=null)return
z=V.c5()
z.c=z.i(0,"Start")
y=J.l(z.i(0,"Start"),"Id")
y.l("_")
y.N("a","z")
y.N("A","Z")
y=J.l(z.i(0,"Id"),"Id")
y.l("_")
y.N("0","9")
y.N("a","z")
y.N("A","Z")
J.l(z.i(0,"Start"),"Int").N("0","9")
J.l(z.i(0,"Int"),"Int").N("0","9")
J.l(z.i(0,"Int"),"FloatDot").l(".")
J.l(z.i(0,"FloatDot"),"Float").N("0","9")
J.l(z.i(0,"Float"),"Float").N("0","9")
J.l(z.i(0,"Start"),"Sym").l("<>{}()\\-+*%!&|=.,?:;")
J.l(z.i(0,"Sym"),"Sym").l("<>{}()\\-+*%!&|=.,?:;")
J.l(z.i(0,"Start"),"OpenDoubleStr").l('"')
J.l(z.i(0,"OpenDoubleStr"),"CloseDoubleStr").l('"')
J.l(z.i(0,"OpenDoubleStr"),"EscDoubleStr").l("\\")
J.l(z.i(0,"EscDoubleStr"),"OpenDoubleStr").l('"')
J.by(J.l(z.i(0,"OpenDoubleStr"),"OpenDoubleStr"))
J.l(z.i(0,"Start"),"OpenSingleStr").l("'")
J.l(z.i(0,"OpenSingleStr"),"CloseSingleStr").l("'")
J.l(z.i(0,"OpenSingleStr"),"EscSingleStr").l("\\")
J.l(z.i(0,"EscSingleStr"),"OpenSingleStr").l("'")
J.by(J.l(z.i(0,"OpenSingleStr"),"OpenSingleStr"))
J.l(z.i(0,"Start"),"Slash").l("/")
J.l(z.i(0,"Slash"),"Comment").l("/")
J.l(z.i(0,"Comment"),"EndComment").l("\n")
J.l(z.i(0,"Comment"),"Comment").a7().l("\n")
J.l(z.i(0,"Slash"),"MLComment").l("*")
J.l(z.i(0,"MLComment"),"MLCStar").l("*")
J.l(z.i(0,"MLCStar"),"MLComment").a7().l("*")
J.l(z.i(0,"MLCStar"),"EndComment").l("/")
J.l(z.i(0,"Start"),"Whitespace").l(" \n\t")
J.l(z.i(0,"Whitespace"),"Whitespace").l(" \n\t")
z.i(0,"Int").L("Num")
z.i(0,"Float").L("Num")
z.i(0,"Sym").L("Symbol")
z.i(0,"CloseDoubleStr").L("String")
z.i(0,"CloseSingleStr").L("String")
z.i(0,"EndComment").L("Comment")
z.i(0,"Whitespace").L("Whitespace")
y=z.i(0,"Id").L("Id")
x=J.m(y)
x.aN(y,"Class",["Constant","Depth","Entity","EntityPass","Math","Matrix4","Movers","Rotater","Scenes","Shapes","Techniques","ThreeDart"])
x.aN(y,"Type",["bool","double","dynamic","false","int","List","Map","null","num","Object","String","this","true","var","void"])
x.aN(y,"Reserved",["abstract","as","assert","async","await","break","case","catch","class","continue","const","default","deferred","do","else","enum","export","extends","external","factory","final","finally","for","get","if","implements","import","in","is","library","new","operator","part","rethrow","return","set","static","super","switch","sync","throw","try","typedef","with","while","yield"])
this.e=z},
fU:function(){var z,y,x
if(this.f!=null)return
z=V.c5()
z.c=z.i(0,"Start")
y=J.l(z.i(0,"Start"),"Id")
y.l("_")
y.N("a","z")
y.N("A","Z")
y=J.l(z.i(0,"Id"),"Id")
y.l("_")
y.N("0","9")
y.N("a","z")
y.N("A","Z")
J.l(z.i(0,"Start"),"Int").N("0","9")
J.l(z.i(0,"Int"),"Int").N("0","9")
J.l(z.i(0,"Int"),"FloatDot").l(".")
J.l(z.i(0,"FloatDot"),"Float").N("0","9")
J.l(z.i(0,"Float"),"Float").N("0","9")
J.l(z.i(0,"Start"),"Sym").l("<>{}()\\-+*%!&|=.,?:;")
J.l(z.i(0,"Sym"),"Sym").l("<>{}()\\-+*%!&|=.,?:;")
J.l(z.i(0,"Start"),"Slash").l("/")
J.l(z.i(0,"Slash"),"Comment").l("/")
J.l(z.i(0,"Comment"),"EndComment").l("\n")
J.l(z.i(0,"Comment"),"Comment").a7().l("\n")
J.l(z.i(0,"Start"),"Preprocess").l("#")
J.l(z.i(0,"Preprocess"),"Preprocess").a7().l("\n")
J.l(z.i(0,"Preprocess"),"EndPreprocess").l("\n")
J.l(z.i(0,"Start"),"Whitespace").l(" \n\t")
J.l(z.i(0,"Whitespace"),"Whitespace").l(" \n\t")
z.i(0,"Int").L("Num")
z.i(0,"Float").L("Num")
z.i(0,"Sym").L("Symbol")
z.i(0,"EndComment").L("Comment")
z.i(0,"EndPreprocess").L("Preprocess")
z.i(0,"Whitespace").L("Whitespace")
y=z.i(0,"Id").L("Id")
x=J.m(y)
x.aN(y,"Type",["float","double","int","void","bool","true","false","mat2","mat3","mat4","dmat2","dmat3","dmat4","mat2x2","mat2x3","mat2x4","dmat2x2","dmat2x3","dmat2x4","mat3x2","mat3x3","mat3x4","dmat3x2","dmat3x3","dmat3x4","mat4x2","mat4x3","mat4x4","dmat4x2","dmat4x3","dmat4x4","vec2","vec3","vec4","ivec2","ivec3","ivec4","bvec2","bvec3","bvec4","dvec2","dvec3","dvec4","uint","uvec2","uvec3","uvec4","sampler1D","sampler2D","sampler3D","samplerCube","sampler1DShadow","sampler2DShadow","samplerCubeShadow","sampler1DArray","sampler2DArray","sampler1DArrayShadow","sampler2DArrayShadow","isampler1D","isampler2D","isampler3D","isamplerCube","isampler1DArray","isampler2DArray","usampler1D","usampler2D","usampler3D","usamplerCube","usampler1DArray","usampler2DArray","sampler2DRect","sampler2DRectShadow","isampler2DRect","usampler2DRect","samplerBuffer","isamplerBuffer","usamplerBuffer","sampler2DMS","isampler2DMS","usampler2DMS","sampler2DMSArray","isampler2DMSArray","usampler2DMSArray","samplerCubeArray","samplerCubeArrayShadow","isamplerCubeArray","usamplerCubeArray"])
x.aN(y,"Reserved",["attribute","break","case","centroid","const","continue","default","discard","do","else","flat","for","highp","if","in","inout","invariant","layout","lowp","mediump","noperspective","out","patch","precision","return","sample","smooth","struct","subroutine","switch","uniform","varying","while"])
x.aN(y,"Builtin",["gl_FragColor","gl_Position"])
this.f=z},
eX:function(a){var z,y,x,w,v,u
z=document.body
y=document
x=y.createElement("div")
x.className="scrollTop"
z.appendChild(x)
y=document
w=y.createElement("div")
w.className="scrollPage"
z.appendChild(w)
y=document
v=y.createElement("div")
v.className="pageCenter"
w.appendChild(v)
if(a.length!==0){document.title=a
y=document
u=y.createElement("div")
u.className="pageTitle"
u.textContent=a
v.appendChild(u)}this.a=new P.it(C.G)
y=document
y=y.createElement("div")
this.b=y
v.appendChild(y)
this.d=null
this.e=null
this.f=null
y=C.F.cO(document)
H.e(new W.aq(0,y.a,y.b,W.ac(new V.jK(z,x)),!1),[H.X(y,0)]).a6()},
n:{
eH:function(a){var z=new V.jJ(null,null,null,null,null,null)
z.eX(a)
return z}}},jK:{"^":"f:1;a,b",
$1:function(a){var z,y
z=this.b.style
y=H.c(-0.05*C.d.ae(this.a.scrollTop))+"px"
z.top=y}}}],["","",,E,{"^":"",
n4:function(){var z,y,x,w,v,u,t,s,r,q,p
z={}
y=V.eH("Tutorial 1")
y.T(['This tutorial will walk you through creating the "Hello World" ',"of 3D graphics, a rotating cube. After this tutorial you should know how ","to create a [3Dart|https://github.com/Grant-Nelson/ThreeDart] project. ","However, it is recommended you have a basic understanding of [Dart|https://www.dartlang.org] ","and [3D Matrices|http://www.opengl-tutorial.org/beginners-tutorials/tutorial-3-matrices/] ","before starting. You will not need to know [WebGL|https://en.wikipedia.org/wiki/WebGL] ","nor [OpenGL|https://en.wikipedia.org/wiki/OpenGL] until the more advanced ","tutorials."])
x=W.dP(null,null)
x.className="pageCanvas"
x.id="tutorial1"
y.b.appendChild(x)
y.aG(0,"Getting Started")
y.T(["The following is the [HTML|#index.html] and the [Dart|#main.dart] files ","that we will explore in this tutorial. For this first tutorial I will just ","provide the code and then we'll go over code describing how it works."])
y.dP("index.html","html",0,["<!DOCTYPE html>","<html>","  <head>",'  \t<meta charset="utf-8">','  \t<meta name="viewport" content="width=device-width, initial-scale=1.0">',"   <title>Tutorial 1</title>","  </head>","  <body>",'    <canvas id="tutorial1" width="800" height="600"></canvas>','    <script type="application/dart" src="main.dart"></script>','    <script src="packages/browser/dart.js"></script>',"  </body>","</html>"])
y.dP("main.dart","dart",0,["library threeDartTutorial1;","","import 'dart:html';","import 'package:ThreeDart/ThreeDart.dart' as ThreeDart;","import 'package:ThreeDart/Shapes.dart' as Shapes;","import 'package:ThreeDart/Movers.dart' as Movers;","import 'package:ThreeDart/Math.dart' as Math;","import 'package:ThreeDart/Techniques.dart' as Techniques;","import 'package:ThreeDart/Scenes.dart' as Scenes;","","void main() {","  ThreeDart.Entity obj = new ThreeDart.Entity()","    ..shape = Shapes.cube()","    ..mover = new Movers.Rotater()","    ..technique = new Techniques.Depth(fogStart: 3.0, fogStop: 6.0);","","  Scenes.EntityPass pass = new Scenes.EntityPass()","    ..children.add(obj)","    ..camera.mover = new Movers.Constant(new Math.Matrix4.translate(0.0, 0.0, 5.0));","",'  ThreeDart.ThreeDart td = new ThreeDart.ThreeDart.fromId("tutorial1")',"    ..scene = pass;","","  var update;","  update = (num t) {","    td.render();","    window.requestAnimationFrame(update);","  };","  window.requestAnimationFrame(update);","}"])
y.aG(4,"ThreeDart")
y.T(["ThreeDart must have a ","[HTML canvas element|http://www.w3schools.com/graphics/canvas_intro.asp] to ","render graphics to. In this example the canvas is provided by [index.html|#index.html] ","and labelled `tutorial1`. On line 21 of [main.dart|#main.dart] the main ThreeDart class ","is created an attached to that canvas using its identifier. Below that is ","the render loop using the browser's `requestAnimationFrame`."])
y.aG(4,"Scene")
y.T(["To make the image, the rendering has to have something to render. ","A scene is set to ThreeDart to provide the content to render. A scene ","can be a single rendering pass or a composite of several scenes. In this ","tutorial the scene is only a single pass for rendering entities, the `EntityPass`. "])
y.T(["The EntityPass has a default render target, a `Front Target`, which renders ","directly to the canvas. On render the target will first clear its depth buffer ","and color buffer which is why the background is black."])
y.T(["The EntityPass also has a default camera, a `Perspective Camera`. ","For this example we moved the camera, using a `Constant Mover`, back so that the ","camera is off the center of the scene and looking at the center of the scene."])
y.aG(4,"Entity")
y.T(["One or more Entities can be added to the EntityPass. An `Entity` can have ","one or more other Entities added to it too. An Entity describes a shape or group ","of shapes that should be rendered in the scene."])
y.T(["In this tutorial we only add one which is what draws the cube to the scene. ","To make it draw a cube we set the shape of the Entity to a cube. The shape ","can be set to many other built-in shapes, such as sphere, torois, and knot. ","The shape can be loaded from a file or created mathmatically or procedually."])
y.T(["To make the Entity rotate a `Mover` is attached to it. For this tutorial ","we used the default `Rotater` to cause it to rotate. Movers can be grouped ","to multiply matrices togrether thus compounding the movements."])
y.T(["The `Technique` attached to the Entity defines how the shape should be ","drawn. In this tutorial we used a very simple technique, `Depth`. Depth ","simply draws the shape with two different colors based on distance from the ","camera. If the background, front target clear color, it the same as the ","far color, it can give the appearence of fog or merky water."])
y.aG(4,"Summary")
y.T(["Play around with the Rotater, Shape, and Depth to get a feel for how the parts works. The main take away from this tutorial should be ","how to structure a basic render. A render is one or more pass which draws ","entities. The pass has a camera and target. Entities can contain several ","entities and can draw a shape. An entity can be moved with a Mover and ","rendered with a given technique."])
y.T(["In the next tutorial we will setup a material light technique ","and dive into creating more interesting scenes."])
w=new E.cD(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
w.a=""
w.b=!0
w.c=null
w.d=null
w.e=null
w.f=null
w.r=null
y=new E.ie(w,null)
y.b=H.e([],[E.cD])
w.x=y
w.y=null
w.z=null
w.Q=null
w.ch=null
w.cx=null
w.cy=null
w.db=null
w.dx=null
w.dy=null
v=F.eG()
F.bt(v,null,null,1,1,1,0,0,1)
F.bt(v,null,null,1,1,0,1,0,3)
F.bt(v,null,null,1,1,0,0,1,2)
F.bt(v,null,null,1,1,-1,0,0,0)
F.bt(v,null,null,1,1,0,-1,0,0)
F.bt(v,null,null,1,1,0,0,-1,3);++v.e.c
if(!v.d.cG());if(!v.a.cG());v.e.b3()
y=w.c
if(y!==v){w.c=v
w.d=null
if(y!=null){y=y.e
u=w.ge9()
C.b.am(y.a,u)}y=w.c
if(y!=null){y=y.e
u=w.ge9()
y.a.push(u)}y=w.y
if(y==null);else y.a8()}y=new U.jy(null,null,null,null,null,null,null,null)
y.a=0
y.b=0
y.c=0
y.d=0.1
y.e=0.21
y.f=0.32
y.r=0
y.x=null
if(w.f!==y){w.f=y
y=w.y
if(y==null);else y.a8()}y=new O.i1(null,null,null,null,null)
y.a=null
u=new V.aY(null,null,null)
u.aP(1,1,1)
y.b=u
u=new V.aY(null,null,null)
u.aP(0,0,0)
y.c=u
y.d=3
y.e=6
if(w.e!==y){w.e=y
w.dj()
y=w.y
if(y==null);else y.a8()}t=new M.ig(null,null,null,null,null,null,null)
y=X.jk(2000,1.0471975511965976,null,0.1)
t.a=y
t.b=X.ir(!0,!0,!1,null,2000,null,0)
t.c=null
u=H.e([],[E.cD])
t.d=u
t.e=E.ad()
t.f=E.ad()
t.r=E.ad()
u.push(w)
u=new V.af(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
u.af(1,0,0,0,0,1,0,0,0,0,1,5,0,0,0,1)
s=new U.hT(null)
s.a=u
y.a=s
r=document.getElementById("tutorial1")
if(r==null)H.p(P.F("Failed to find an element with the identifier, tutorial1."))
q=E.kb(r,!0,!0,!0,!1)
q.d=t
q.ee()
z.a=null
p=new E.n5(z,q)
z.a=p
z=window
C.i.dt(z)
C.i.dF(z,W.ac(p))},
n5:{"^":"f:19;a,b",
$1:function(a){var z,y
this.b.ee()
z=window
y=this.a.a
C.i.dt(z)
C.i.dF(z,W.ac(y))}}}],["","",,H,{"^":"",nT:{"^":"b;a"}}],["","",,J,{"^":"",
u:function(a){return void 0},
cl:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
cj:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.dm==null){H.mM()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.a(new P.f6("Return interceptor for "+H.c(y(a,z))))}w=H.mU(a)
if(w==null){if(typeof a=="function")return C.P
y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.X
else return C.Y}return w},
k:{"^":"b;",
w:function(a,b){return a===b},
gV:function(a){return H.aP(a)},
h:["eH",function(a){return H.bn(a)}],
"%":"CanvasRenderingContext2D|DOMImplementation|MediaError|MediaKeyError|PositionError|SQLError|SVGAnimatedEnumeration|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WebGLBuffer|WebGLFramebuffer|WebGLProgram|WebGLRenderbuffer|WebGLShader|WebGLTexture|WebGLUniformLocation"},
iR:{"^":"k;",
h:function(a){return String(a)},
gV:function(a){return a?519018:218159},
$isb6:1},
iT:{"^":"k;",
w:function(a,b){return null==b},
h:function(a){return"null"},
gV:function(a){return 0}},
cF:{"^":"k;",
gV:function(a){return 0},
h:["eJ",function(a){return String(a)}],
$isiU:1},
jl:{"^":"cF;"},
bK:{"^":"cF;"},
bF:{"^":"cF;",
h:function(a){var z=a[$.$get$dT()]
return z==null?this.eJ(a):J.C(z)}},
bC:{"^":"k;",
dV:function(a,b){if(!!a.immutable$list)throw H.a(new P.w(b))},
bT:function(a,b){if(!!a.fixed$length)throw H.a(new P.w(b))},
p:function(a,b){this.bT(a,"add")
a.push(b)},
ib:function(a,b){this.bT(a,"removeAt")
if(b>=a.length)throw H.a(P.bo(b,null,null))
return a.splice(b,1)[0]},
am:function(a,b){var z
this.bT(a,"remove")
for(z=0;z<a.length;++z)if(J.E(a[z],b)){a.splice(z,1)
return!0}return!1},
B:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.a(new P.W(a))}},
b0:function(a,b){return H.e(new H.bG(a,b),[null,null])},
P:function(a,b){var z,y,x,w
z=a.length
y=new Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.c(a[x])
if(x>=z)return H.d(y,x)
y[x]=w}return y.join(b)},
hX:function(a){return this.P(a,"")},
hK:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.a(new P.W(a))}return y},
U:function(a,b){if(b<0||b>=a.length)return H.d(a,b)
return a[b]},
ca:function(a,b,c){if(b<0||b>a.length)throw H.a(P.L(b,0,a.length,"start",null))
if(c<b||c>a.length)throw H.a(P.L(c,b,a.length,"end",null))
if(b===c)return H.e([],[H.X(a,0)])
return H.e(a.slice(b,c),[H.X(a,0)])},
ghJ:function(a){if(a.length>0)return a[0]
throw H.a(H.al())},
gO:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.a(H.al())},
d7:function(a,b,c,d,e){var z,y,x
this.dV(a,"set range")
P.bp(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.p(P.L(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.a(H.iO())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x<0||x>=d.length)return H.d(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x<0||x>=d.length)return H.d(d,x)
a[b+y]=d[x]}},
dT:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y])===!0)return!0
if(a.length!==z)throw H.a(new P.W(a))}return!1},
aZ:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.E(a[z],b))return z
return-1},
K:function(a,b){return this.aZ(a,b,0)},
a0:function(a,b){var z
for(z=0;z<a.length;++z)if(J.E(a[z],b))return!0
return!1},
gE:function(a){return a.length===0},
h:function(a){return P.bZ(a,"[","]")},
gI:function(a){return new J.cw(a,a.length,0,null)},
gV:function(a){return H.aP(a)},
gk:function(a){return a.length},
sk:function(a,b){this.bT(a,"set length")
if(b<0)throw H.a(P.L(b,0,null,"newLength",null))
a.length=b},
j:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.a(H.Q(a,b))
if(b>=a.length||b<0)throw H.a(H.Q(a,b))
return a[b]},
F:function(a,b,c){this.dV(a,"indexed set")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.a(H.Q(a,b))
if(b>=a.length||b<0)throw H.a(H.Q(a,b))
a[b]=c},
$isax:1,
$isi:1,
$asi:null,
$isr:1,
n:{
iQ:function(a,b){var z
if(typeof a!=="number"||Math.floor(a)!==a)throw H.a(P.cv(a,"length","is not an integer"))
if(a<0||a>4294967295)throw H.a(P.L(a,0,4294967295,"length",null))
z=H.e(new Array(a),[b])
z.fixed$length=Array
return z}}},
nS:{"^":"bC;"},
cw:{"^":"b;a,b,c,d",
gC:function(){return this.d},
m:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.a(H.v(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
bD:{"^":"k;",
cI:function(a,b){var z
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=C.c.gbV(b)
if(this.gbV(a)===z)return 0
if(this.gbV(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gbV:function(a){return a===0?1/a<0:a<0},
cW:function(a,b){return a%b},
c1:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.a(new P.w(""+a))},
ae:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.a(new P.w(""+a))},
hc:function(a,b,c){if(C.c.cI(b,c)>0)throw H.a(H.K(b))
if(this.cI(a,b)<0)return b
if(this.cI(a,c)>0)return c
return a},
is:function(a,b){var z
H.ce(b)
if(typeof b!=="number")return b.H()
if(b>20)throw H.a(P.L(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gbV(a))return"-"+z
return z},
bz:function(a,b){var z,y,x,w
H.ce(b)
if(b<2||b>36)throw H.a(P.L(b,2,36,"radix",null))
z=a.toString(b)
if(C.a.q(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.p(new P.w("Unexpected toString result: "+z))
x=J.R(y)
z=x.j(y,1)
w=+x.j(y,3)
if(x.j(y,2)!=null){z+=x.j(y,2)
w-=x.j(y,2).length}return z+C.a.D("0",w)},
h:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gV:function(a){return a&0x1FFFFFFF},
ay:function(a){return-a},
t:function(a,b){if(typeof b!=="number")throw H.a(H.K(b))
return a+b},
X:function(a,b){if(typeof b!=="number")throw H.a(H.K(b))
return a-b},
D:function(a,b){if(typeof b!=="number")throw H.a(H.K(b))
return a*b},
c4:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
bl:function(a,b){return(a|0)===a?a/b|0:this.c1(a/b)},
aE:function(a,b){return b>31?0:a<<b>>>0},
aF:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
fY:function(a,b){if(b<0)throw H.a(H.K(b))
return b>31?0:a>>>b},
H:function(a,b){if(typeof b!=="number")throw H.a(H.K(b))
return a<b},
a1:function(a,b){if(typeof b!=="number")throw H.a(H.K(b))
return a>b},
bE:function(a,b){if(typeof b!=="number")throw H.a(H.K(b))
return a<=b},
$isba:1},
ed:{"^":"bD;",$isZ:1,$isba:1,$isn:1},
iS:{"^":"bD;",$isZ:1,$isba:1},
bE:{"^":"k;",
q:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.a(H.Q(a,b))
if(b<0)throw H.a(H.Q(a,b))
if(b>=a.length)throw H.a(H.Q(a,b))
return a.charCodeAt(b)},
h5:function(a,b,c){H.aV(b)
H.ce(c)
if(c>b.length)throw H.a(P.L(c,0,b.length,null,null))
return new H.m2(b,a,c)},
h4:function(a,b){return this.h5(a,b,0)},
t:function(a,b){if(typeof b!=="string")throw H.a(P.cv(b,null,null))
return a+b},
ih:function(a,b,c){H.aV(c)
return H.dq(a,b,c)},
eG:function(a,b,c){var z
H.ce(c)
if(c>a.length)throw H.a(P.L(c,0,a.length,null,null))
z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)},
ap:function(a,b){return this.eG(a,b,0)},
M:function(a,b,c){if(typeof b!=="number"||Math.floor(b)!==b)H.p(H.K(b))
if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.p(H.K(c))
if(typeof b!=="number")return b.H()
if(b<0)throw H.a(P.bo(b,null,null))
if(typeof c!=="number")return H.t(c)
if(b>c)throw H.a(P.bo(b,null,null))
if(c>a.length)throw H.a(P.bo(c,null,null))
return a.substring(b,c)},
ba:function(a,b){return this.M(a,b,null)},
iq:function(a){return a.toLowerCase()},
D:function(a,b){var z,y
if(typeof b!=="number")return H.t(b)
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.a(C.z)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
i5:function(a,b,c){var z=b-a.length
if(z<=0)return a
return this.D(c,z)+a},
ad:function(a,b){return this.i5(a,b," ")},
aZ:function(a,b,c){if(c<0||c>a.length)throw H.a(P.L(c,0,a.length,null,null))
return a.indexOf(b,c)},
K:function(a,b){return this.aZ(a,b,0)},
dX:function(a,b,c){if(b==null)H.p(H.K(b))
if(c>a.length)throw H.a(P.L(c,0,a.length,null,null))
return H.n1(a,b,c)},
a0:function(a,b){return this.dX(a,b,0)},
gE:function(a){return a.length===0},
h:function(a){return a},
gV:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
gk:function(a){return a.length},
j:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.a(H.Q(a,b))
if(b>=a.length||b<0)throw H.a(H.Q(a,b))
return a[b]},
$isax:1,
$iso:1}}],["","",,H,{"^":"",
bO:function(a,b){var z=a.bq(b)
if(!init.globalState.d.cy)init.globalState.f.bx()
return z},
h0:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.u(y).$isi)throw H.a(P.aG("Arguments to main must be a List: "+H.c(y)))
init.globalState=new H.lN(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$eb()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.lp(P.cJ(null,H.bM),0)
y.z=H.e(new H.a9(0,null,null,null,null,null,0),[P.n,H.dd])
y.ch=H.e(new H.a9(0,null,null,null,null,null,0),[P.n,null])
if(y.x===!0){x=new H.lM()
y.Q=x
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.iH,x)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.lO)}if(init.globalState.x===!0)return
y=init.globalState.a++
x=H.e(new H.a9(0,null,null,null,null,null,0),[P.n,H.c3])
w=P.am(null,null,null,P.n)
v=new H.c3(0,null,!1)
u=new H.dd(y,x,w,init.createNewIsolate(),v,new H.aX(H.cm()),new H.aX(H.cm()),!1,!1,[],P.am(null,null,null,null),null,null,!1,!0,P.am(null,null,null,null))
w.p(0,0)
u.dh(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.bQ()
x=H.b7(y,[y]).aC(a)
if(x)u.bq(new H.n_(z,a))
else{y=H.b7(y,[y,y]).aC(a)
if(y)u.bq(new H.n0(z,a))
else u.bq(a)}init.globalState.f.bx()},
iL:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.iM()
return},
iM:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.a(new P.w("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.a(new P.w('Cannot extract URI from "'+H.c(z)+'"'))},
iH:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.ca(!0,[]).aI(b.data)
y=J.R(z)
switch(y.j(z,"command")){case"start":init.globalState.b=y.j(z,"id")
x=y.j(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.j(z,"args")
u=new H.ca(!0,[]).aI(y.j(z,"msg"))
t=y.j(z,"isSpawnUri")
s=y.j(z,"startPaused")
r=new H.ca(!0,[]).aI(y.j(z,"replyTo"))
y=init.globalState.a++
q=H.e(new H.a9(0,null,null,null,null,null,0),[P.n,H.c3])
p=P.am(null,null,null,P.n)
o=new H.c3(0,null,!1)
n=new H.dd(y,q,p,init.createNewIsolate(),o,new H.aX(H.cm()),new H.aX(H.cm()),!1,!1,[],P.am(null,null,null,null),null,null,!1,!0,P.am(null,null,null,null))
p.p(0,0)
n.dh(0,o)
init.globalState.f.a.ag(new H.bM(n,new H.iI(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.bx()
break
case"spawn-worker":break
case"message":if(y.j(z,"port")!=null)J.be(y.j(z,"port"),y.j(z,"msg"))
init.globalState.f.bx()
break
case"close":init.globalState.ch.am(0,$.$get$ec().j(0,a))
a.terminate()
init.globalState.f.bx()
break
case"log":H.iG(y.j(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.b_(["command","print","msg",z])
q=new H.b3(!0,P.bs(null,P.n)).aa(q)
y.toString
self.postMessage(q)}else P.bb(y.j(z,"msg"))
break
case"error":throw H.a(y.j(z,"msg"))}},
iG:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.b_(["command","log","msg",a])
x=new H.b3(!0,P.bs(null,P.n)).aa(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.D(w)
z=H.S(w)
throw H.a(P.F(z))}},
iJ:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.ex=$.ex+("_"+y)
$.ey=$.ey+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
J.be(f,["spawned",new H.cb(y,x),w,z.r])
x=new H.iK(a,b,c,d,z)
if(e===!0){z.dS(w,w)
init.globalState.f.a.ag(new H.bM(z,x,"start isolate"))}else x.$0()},
mn:function(a){return new H.ca(!0,[]).aI(new H.b3(!1,P.bs(null,P.n)).aa(a))},
n_:{"^":"f:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
n0:{"^":"f:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
lN:{"^":"b;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",n:{
lO:function(a){var z=P.b_(["command","print","msg",a])
return new H.b3(!0,P.bs(null,P.n)).aa(z)}}},
dd:{"^":"b;a,b,c,hW:d<,hi:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
dS:function(a,b){if(!this.f.w(0,a))return
if(this.Q.p(0,b)&&!this.y)this.y=!0
this.bN()},
ie:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.am(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.d(z,-1)
x=z.pop()
y=init.globalState.f.a
w=y.b
v=y.a
u=v.length
w=(w-1&u-1)>>>0
y.b=w
if(w<0||w>=u)return H.d(v,w)
v[w]=x
if(w===y.c)y.dv();++y.d}this.y=!1}this.bN()},
h2:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.u(a),y=0;x=this.ch,y<x.length;y+=2)if(z.w(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.d(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
ic:function(a){var z,y,x
if(this.ch==null)return
for(z=J.u(a),y=0;x=this.ch,y<x.length;y+=2)if(z.w(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.p(new P.w("removeRange"))
P.bp(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
eE:function(a,b){if(!this.r.w(0,a))return
this.db=b},
hN:function(a,b,c){var z=J.u(b)
if(!z.w(b,0))z=z.w(b,1)&&!this.cy
else z=!0
if(z){J.be(a,c)
return}z=this.cx
if(z==null){z=P.cJ(null,null)
this.cx=z}z.ag(new H.lF(a,c))},
hM:function(a,b){var z
if(!this.r.w(0,a))return
z=J.u(b)
if(!z.w(b,0))z=z.w(b,1)&&!this.cy
else z=!0
if(z){this.cS()
return}z=this.cx
if(z==null){z=P.cJ(null,null)
this.cx=z}z.ag(this.ghY())},
hO:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.bb(a)
if(b!=null)P.bb(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.C(a)
y[1]=b==null?null:J.C(b)
for(x=new P.bN(z,z.r,null,null),x.c=z.e;x.m();)J.be(x.d,y)},
bq:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.D(u)
w=t
v=H.S(u)
this.hO(w,v)
if(this.db===!0){this.cS()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.ghW()
if(this.cx!=null)for(;t=this.cx,!t.gE(t);)this.cx.ed().$0()}return y},
e7:function(a){return this.b.j(0,a)},
dh:function(a,b){var z=this.b
if(z.bU(a))throw H.a(P.F("Registry: ports must be registered only once."))
z.F(0,a,b)},
bN:function(){var z=this.b
if(z.gk(z)-this.c.a>0||this.y||!this.x)init.globalState.z.F(0,this.a,this)
else this.cS()},
cS:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.aX(0)
for(z=this.b,y=z.gen(z),y=y.gI(y);y.m();)y.gC().f6()
z.aX(0)
this.c.aX(0)
init.globalState.z.am(0,this.a)
this.dx.aX(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.d(z,v)
J.be(w,z[v])}this.ch=null}},"$0","ghY",0,0,2]},
lF:{"^":"f:2;a,b",
$0:function(){J.be(this.a,this.b)}},
lp:{"^":"b;a,b",
hr:function(){var z=this.a
if(z.b===z.c)return
return z.ed()},
eh:function(){var z,y,x
z=this.hr()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.bU(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gE(y)}else y=!1
else y=!1
else y=!1
if(y)H.p(P.F("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gE(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.b_(["command","close"])
x=new H.b3(!0,H.e(new P.fA(0,null,null,null,null,null,0),[null,P.n])).aa(x)
y.toString
self.postMessage(x)}return!1}z.i8()
return!0},
dH:function(){if(self.window!=null)new H.lq(this).$0()
else for(;this.eh(););},
bx:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.dH()
else try{this.dH()}catch(x){w=H.D(x)
z=w
y=H.S(x)
w=init.globalState.Q
v=P.b_(["command","error","msg",H.c(z)+"\n"+H.c(y)])
v=new H.b3(!0,P.bs(null,P.n)).aa(v)
w.toString
self.postMessage(v)}}},
lq:{"^":"f:2;a",
$0:function(){if(!this.a.eh())return
P.kg(C.m,this)}},
bM:{"^":"b;a,b,c",
i8:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.bq(this.b)}},
lM:{"^":"b;"},
iI:{"^":"f:0;a,b,c,d,e,f",
$0:function(){H.iJ(this.a,this.b,this.c,this.d,this.e,this.f)}},
iK:{"^":"f:2;a,b,c,d,e",
$0:function(){var z,y,x,w
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.bQ()
w=H.b7(x,[x,x]).aC(y)
if(w)y.$2(this.b,this.c)
else{x=H.b7(x,[x]).aC(y)
if(x)y.$1(this.b)
else y.$0()}}z.bN()}},
fm:{"^":"b;"},
cb:{"^":"fm;b,a",
c6:function(a,b){var z,y,x,w
z=init.globalState.z.j(0,this.a)
if(z==null)return
y=this.b
if(y.gdC())return
x=H.mn(b)
if(z.ghi()===y){y=J.R(x)
switch(y.j(x,0)){case"pause":z.dS(y.j(x,1),y.j(x,2))
break
case"resume":z.ie(y.j(x,1))
break
case"add-ondone":z.h2(y.j(x,1),y.j(x,2))
break
case"remove-ondone":z.ic(y.j(x,1))
break
case"set-errors-fatal":z.eE(y.j(x,1),y.j(x,2))
break
case"ping":z.hN(y.j(x,1),y.j(x,2),y.j(x,3))
break
case"kill":z.hM(y.j(x,1),y.j(x,2))
break
case"getErrors":y=y.j(x,1)
z.dx.p(0,y)
break
case"stopErrors":y=y.j(x,1)
z.dx.am(0,y)
break}return}y=init.globalState.f
w="receive "+H.c(b)
y.a.ag(new H.bM(z,new H.lQ(this,x),w))},
w:function(a,b){if(b==null)return!1
return b instanceof H.cb&&J.E(this.b,b.b)},
gV:function(a){return this.b.gcp()}},
lQ:{"^":"f:0;a,b",
$0:function(){var z=this.a.b
if(!z.gdC())z.f5(this.b)}},
de:{"^":"fm;b,c,a",
c6:function(a,b){var z,y,x
z=P.b_(["command","message","port",this,"msg",b])
y=new H.b3(!0,P.bs(null,P.n)).aa(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.j(0,this.b)
if(x!=null)x.postMessage(y)}},
w:function(a,b){if(b==null)return!1
return b instanceof H.de&&J.E(this.b,b.b)&&J.E(this.a,b.a)&&J.E(this.c,b.c)},
gV:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.c9()
y=this.a
if(typeof y!=="number")return y.c9()
x=this.c
if(typeof x!=="number")return H.t(x)
return(z<<16^y<<8^x)>>>0}},
c3:{"^":"b;cp:a<,b,dC:c<",
f6:function(){this.c=!0
this.b=null},
Z:function(a){var z,y
if(this.c)return
this.c=!0
this.b=null
z=init.globalState.d
y=this.a
z.b.am(0,y)
z.c.am(0,y)
z.bN()},
f5:function(a){if(this.c)return
this.fu(a)},
fu:function(a){return this.b.$1(a)},
$isjq:1},
kc:{"^":"b;a,b,c",
eZ:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.ag(new H.bM(y,new H.ke(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.b9(new H.kf(this,b),0),a)}else throw H.a(new P.w("Timer greater than 0."))},
n:{
kd:function(a,b){var z=new H.kc(!0,!1,null)
z.eZ(a,b)
return z}}},
ke:{"^":"f:2;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
kf:{"^":"f:2;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
aX:{"^":"b;cp:a<",
gV:function(a){var z=this.a
if(typeof z!=="number")return z.eF()
z=C.d.aF(z,0)^C.d.bl(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
w:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.aX){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
b3:{"^":"b;a,b",
aa:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.j(0,a)
if(y!=null)return["ref",y]
z.F(0,a,z.gk(z))
z=J.u(a)
if(!!z.$isel)return["buffer",a]
if(!!z.$iscO)return["typed",a]
if(!!z.$isax)return this.eA(a)
if(!!z.$isiF){x=this.gex()
w=a.gal()
w=H.c1(w,x,H.M(w,"P",0),null)
w=P.bm(w,!0,H.M(w,"P",0))
z=z.gen(a)
z=H.c1(z,x,H.M(z,"P",0),null)
return["map",w,P.bm(z,!0,H.M(z,"P",0))]}if(!!z.$isiU)return this.eB(a)
if(!!z.$isk)this.el(a)
if(!!z.$isjq)this.bA(a,"RawReceivePorts can't be transmitted:")
if(!!z.$iscb)return this.eC(a)
if(!!z.$isde)return this.eD(a)
if(!!z.$isf){v=a.$static_name
if(v==null)this.bA(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isaX)return["capability",a.a]
if(!(a instanceof P.b))this.el(a)
return["dart",init.classIdExtractor(a),this.ez(init.classFieldsExtractor(a))]},"$1","gex",2,0,1],
bA:function(a,b){throw H.a(new P.w(H.c(b==null?"Can't transmit:":b)+" "+H.c(a)))},
el:function(a){return this.bA(a,null)},
eA:function(a){var z=this.ey(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.bA(a,"Can't serialize indexable: ")},
ey:function(a){var z,y,x
z=[]
C.b.sk(z,a.length)
for(y=0;y<a.length;++y){x=this.aa(a[y])
if(y>=z.length)return H.d(z,y)
z[y]=x}return z},
ez:function(a){var z
for(z=0;z<a.length;++z)C.b.F(a,z,this.aa(a[z]))
return a},
eB:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.bA(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.b.sk(y,z.length)
for(x=0;x<z.length;++x){w=this.aa(a[z[x]])
if(x>=y.length)return H.d(y,x)
y[x]=w}return["js-object",z,y]},
eD:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
eC:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gcp()]
return["raw sendport",a]}},
ca:{"^":"b;a,b",
aI:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.a(P.aG("Bad serialized message: "+H.c(a)))
switch(C.b.ghJ(a)){case"ref":if(1>=a.length)return H.d(a,1)
z=a[1]
y=this.b
if(z>>>0!==z||z>=y.length)return H.d(y,z)
return y[z]
case"buffer":if(1>=a.length)return H.d(a,1)
x=a[1]
this.b.push(x)
return x
case"typed":if(1>=a.length)return H.d(a,1)
x=a[1]
this.b.push(x)
return x
case"fixed":if(1>=a.length)return H.d(a,1)
x=a[1]
this.b.push(x)
y=H.e(this.bo(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.d(a,1)
x=a[1]
this.b.push(x)
return H.e(this.bo(x),[null])
case"mutable":if(1>=a.length)return H.d(a,1)
x=a[1]
this.b.push(x)
return this.bo(x)
case"const":if(1>=a.length)return H.d(a,1)
x=a[1]
this.b.push(x)
y=H.e(this.bo(x),[null])
y.fixed$length=Array
return y
case"map":return this.hu(a)
case"sendport":return this.hv(a)
case"raw sendport":if(1>=a.length)return H.d(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.ht(a)
case"function":if(1>=a.length)return H.d(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.d(a,1)
return new H.aX(a[1])
case"dart":y=a.length
if(1>=y)return H.d(a,1)
w=a[1]
if(2>=y)return H.d(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.bo(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.a("couldn't deserialize: "+H.c(a))}},"$1","ghs",2,0,1],
bo:function(a){var z,y,x
z=J.R(a)
y=0
while(!0){x=z.gk(a)
if(typeof x!=="number")return H.t(x)
if(!(y<x))break
z.F(a,y,this.aI(z.j(a,y)));++y}return a},
hu:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.d(a,1)
y=a[1]
if(2>=z)return H.d(a,2)
x=a[2]
w=P.cI()
this.b.push(w)
y=J.hr(y,this.ghs()).b4(0)
for(z=J.R(y),v=J.R(x),u=0;u<z.gk(y);++u){if(u>=y.length)return H.d(y,u)
w.F(0,y[u],this.aI(v.j(x,u)))}return w},
hv:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.d(a,1)
y=a[1]
if(2>=z)return H.d(a,2)
x=a[2]
if(3>=z)return H.d(a,3)
w=a[3]
if(J.E(y,init.globalState.b)){v=init.globalState.z.j(0,x)
if(v==null)return
u=v.e7(w)
if(u==null)return
t=new H.cb(u,x)}else t=new H.de(y,w,x)
this.b.push(t)
return t},
ht:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.d(a,1)
y=a[1]
if(2>=z)return H.d(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.R(y)
v=J.R(x)
u=0
while(!0){t=z.gk(y)
if(typeof t!=="number")return H.t(t)
if(!(u<t))break
w[z.j(y,u)]=this.aI(v.j(x,u));++u}return w}}}],["","",,H,{"^":"",
mE:function(a){return init.types[a]},
fW:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.u(a).$isay},
c:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.C(a)
if(typeof z!=="string")throw H.a(H.K(a))
return z},
aP:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
cS:function(a,b){throw H.a(new P.a5(a,null,null))},
ez:function(a,b,c){var z,y,x,w,v,u
H.aV(a)
z=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(z==null)return H.cS(a,c)
if(3>=z.length)return H.d(z,3)
y=z[3]
if(b==null){if(y!=null)return parseInt(a,10)
if(z[2]!=null)return parseInt(a,16)
return H.cS(a,c)}if(b<2||b>36)throw H.a(P.L(b,2,36,"radix",null))
if(b===10&&y!=null)return parseInt(a,10)
if(b<10||y==null){x=b<=10?47+b:86+b
w=z[1]
for(v=w.length,u=0;u<v;++u)if((C.a.q(w,u)|32)>x)return H.cS(a,c)}return parseInt(a,b)},
cU:function(a){var z,y,x,w,v,u,t,s
z=J.u(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.H||!!J.u(a).$isbK){v=C.q(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.a.q(w,0)===36)w=C.a.ba(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.fX(H.dk(a),0,null),init.mangledGlobalNames)},
bn:function(a){return"Instance of '"+H.cU(a)+"'"},
jm:function(){if(!!self.location)return self.location.href
return},
ew:function(a){var z,y,x,w,v
z=a.length
if(z<=500)return String.fromCharCode.apply(null,a)
for(y="",x=0;x<z;x=w){w=x+500
v=w<z?w:z
y+=String.fromCharCode.apply(null,a.slice(x,v))}return y},
jn:function(a){var z,y,x,w
z=H.e([],[P.n])
for(y=a.length,x=0;x<a.length;a.length===y||(0,H.v)(a),++x){w=a[x]
if(typeof w!=="number"||Math.floor(w)!==w)throw H.a(H.K(w))
if(w<=65535)z.push(w)
else if(w<=1114111){z.push(55296+(C.c.aF(w-65536,10)&1023))
z.push(56320+(w&1023))}else throw H.a(H.K(w))}return H.ew(z)},
eB:function(a){var z,y,x,w
for(z=a.length,y=0;x=a.length,y<x;x===z||(0,H.v)(a),++y){w=a[y]
if(typeof w!=="number"||Math.floor(w)!==w)throw H.a(H.K(w))
if(w<0)throw H.a(H.K(w))
if(w>65535)return H.jn(a)}return H.ew(a)},
jo:function(a,b,c){var z,y,x,w
if(c<=500&&b===0&&c===a.length)return String.fromCharCode.apply(null,a)
for(z=b,y="";z<c;z=x){x=z+500
w=x<c?x:c
y+=String.fromCharCode.apply(null,a.subarray(z,w))}return y},
aQ:function(a){var z
if(0<=a){if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.c.aF(z,10))>>>0,56320|z&1023)}}throw H.a(P.L(a,0,1114111,null,null))},
a3:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
cT:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.a(H.K(a))
return a[b]},
eA:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.a(H.K(a))
a[b]=c},
t:function(a){throw H.a(H.K(a))},
d:function(a,b){if(a==null)J.N(a)
throw H.a(H.Q(a,b))},
Q:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aj(!0,b,"index",null)
z=J.N(a)
if(!(b<0)){if(typeof z!=="number")return H.t(z)
y=b>=z}else y=!0
if(y)return P.aL(b,a,"index",null,z)
return P.bo(b,"index",null)},
mC:function(a,b,c){if(a>c)return new P.c2(0,c,!0,a,"start","Invalid value")
if(b!=null)if(b<a||b>c)return new P.c2(a,c,!0,b,"end","Invalid value")
return new P.aj(!0,b,"end",null)},
K:function(a){return new P.aj(!0,a,null,null)},
T:function(a){if(typeof a!=="number")throw H.a(H.K(a))
return a},
ce:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.a(H.K(a))
return a},
aV:function(a){if(typeof a!=="string")throw H.a(H.K(a))
return a},
a:function(a){var z
if(a==null)a=new P.es()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.h2})
z.name=""}else z.toString=H.h2
return z},
h2:function(){return J.C(this.dartException)},
p:function(a){throw H.a(a)},
v:function(a){throw H.a(new P.W(a))},
D:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.n6(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.c.aF(x,16)&8191)===10)switch(w){case 438:return z.$1(H.cG(H.c(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.c(y)+" (Error "+w+")"
return z.$1(new H.er(v,null))}}if(a instanceof TypeError){u=$.$get$eW()
t=$.$get$eX()
s=$.$get$eY()
r=$.$get$eZ()
q=$.$get$f2()
p=$.$get$f3()
o=$.$get$f0()
$.$get$f_()
n=$.$get$f5()
m=$.$get$f4()
l=u.ac(y)
if(l!=null)return z.$1(H.cG(y,l))
else{l=t.ac(y)
if(l!=null){l.method="call"
return z.$1(H.cG(y,l))}else{l=s.ac(y)
if(l==null){l=r.ac(y)
if(l==null){l=q.ac(y)
if(l==null){l=p.ac(y)
if(l==null){l=o.ac(y)
if(l==null){l=r.ac(y)
if(l==null){l=n.ac(y)
if(l==null){l=m.ac(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.er(y,l==null?null:l.method))}}return z.$1(new H.kv(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.eJ()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aj(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.eJ()
return a},
S:function(a){var z
if(a==null)return new H.fC(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.fC(a,null)},
mX:function(a){if(a==null||typeof a!='object')return J.V(a)
else return H.aP(a)},
mD:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.F(0,a[y],a[x])}return b},
mO:function(a,b,c,d,e,f,g){switch(c){case 0:return H.bO(b,new H.mP(a))
case 1:return H.bO(b,new H.mQ(a,d))
case 2:return H.bO(b,new H.mR(a,d,e))
case 3:return H.bO(b,new H.mS(a,d,e,f))
case 4:return H.bO(b,new H.mT(a,d,e,f,g))}throw H.a(P.F("Unsupported number of arguments for wrapped closure"))},
b9:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.mO)
a.$identity=z
return z},
hQ:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.u(c).$isi){z.$reflectionInfo=c
x=H.js(z).r}else x=c
w=d?Object.create(new H.jP().constructor.prototype):Object.create(new H.cz(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.ak
$.ak=J.j(u,1)
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.dR(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.mE,x)
else if(u&&typeof x=="function"){q=t?H.dK:H.cA
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.a("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.dR(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
hN:function(a,b,c,d){var z=H.cA
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
dR:function(a,b,c){var z,y,x,w,v,u
if(c)return H.hP(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.hN(y,!w,z,b)
if(y===0){w=$.bg
if(w==null){w=H.bX("self")
$.bg=w}w="return function(){return this."+H.c(w)+"."+H.c(z)+"();"
v=$.ak
$.ak=J.j(v,1)
return new Function(w+H.c(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.bg
if(v==null){v=H.bX("self")
$.bg=v}v=w+H.c(v)+"."+H.c(z)+"("+u+");"
w=$.ak
$.ak=J.j(w,1)
return new Function(v+H.c(w)+"}")()},
hO:function(a,b,c,d){var z,y
z=H.cA
y=H.dK
switch(b?-1:a){case 0:throw H.a(new H.jz("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
hP:function(a,b){var z,y,x,w,v,u,t,s
z=H.hI()
y=$.dJ
if(y==null){y=H.bX("receiver")
$.dJ=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.hO(w,!u,x,b)
if(w===1){y="return function(){return this."+H.c(z)+"."+H.c(x)+"(this."+H.c(y)+");"
u=$.ak
$.ak=J.j(u,1)
return new Function(y+H.c(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.c(z)+"."+H.c(x)+"(this."+H.c(y)+", "+s+");"
u=$.ak
$.ak=J.j(u,1)
return new Function(y+H.c(u)+"}")()},
dj:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.u(c).$isi){c.fixed$length=Array
z=c}else z=c
return H.hQ(a,b,z,!!d,e,f)},
mZ:function(a,b){var z=J.R(b)
throw H.a(H.hL(H.cU(a),z.M(b,3,z.gk(b))))},
bx:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.u(a)[b]
else z=!0
if(z)return a
H.mZ(a,b)},
n3:function(a){throw H.a(new P.hY("Cyclic initialization for static "+H.c(a)))},
b7:function(a,b,c){return new H.jA(a,b,c,null)},
bQ:function(){return C.y},
cm:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
e:function(a,b){a.$builtinTypeInfo=b
return a},
dk:function(a){if(a==null)return
return a.$builtinTypeInfo},
fU:function(a,b){return H.h1(a["$as"+H.c(b)],H.dk(a))},
M:function(a,b,c){var z=H.fU(a,b)
return z==null?null:z[c]},
X:function(a,b){var z=H.dk(a)
return z==null?null:z[b]},
dp:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.fX(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.c.h(a)
else return},
fX:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.a1("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.c(H.dp(u,c))}return w?"":"<"+H.c(z)+">"},
h1:function(a,b){if(typeof a=="function"){a=a.apply(null,b)
if(a==null)return a
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)}return b},
mv:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.a7(a[y],b[y]))return!1
return!0},
b8:function(a,b,c){return a.apply(b,H.fU(b,c))},
a7:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.fV(a,b)
if('func' in a)return b.builtin$cls==="nM"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.dp(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.c(H.dp(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.mv(H.h1(v,z),x)},
fR:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.a7(z,v)||H.a7(v,z)))return!1}return!0},
mu:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.a7(v,u)||H.a7(u,v)))return!1}return!0},
fV:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.a7(z,y)||H.a7(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.fR(x,w,!1))return!1
if(!H.fR(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.a7(o,n)||H.a7(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.a7(o,n)||H.a7(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.a7(o,n)||H.a7(n,o)))return!1}}return H.mu(a.named,b.named)},
p1:function(a){var z=$.dl
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
p_:function(a){return H.aP(a)},
oZ:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
mU:function(a){var z,y,x,w,v,u
z=$.dl.$1(a)
y=$.cf[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.ck[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.fQ.$2(a,z)
if(z!=null){y=$.cf[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.ck[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.dn(x)
$.cf[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.ck[z]=x
return x}if(v==="-"){u=H.dn(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.fY(a,x)
if(v==="*")throw H.a(new P.f6(z))
if(init.leafTags[z]===true){u=H.dn(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.fY(a,x)},
fY:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.cl(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
dn:function(a){return J.cl(a,!1,null,!!a.$isay)},
mV:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.cl(z,!1,null,!!z.$isay)
else return J.cl(z,c,null,null)},
mM:function(){if(!0===$.dm)return
$.dm=!0
H.mN()},
mN:function(){var z,y,x,w,v,u,t,s
$.cf=Object.create(null)
$.ck=Object.create(null)
H.mI()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.fZ.$1(v)
if(u!=null){t=H.mV(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
mI:function(){var z,y,x,w,v,u,t
z=C.I()
z=H.b5(C.J,H.b5(C.K,H.b5(C.p,H.b5(C.p,H.b5(C.M,H.b5(C.L,H.b5(C.N(C.q),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.dl=new H.mJ(v)
$.fQ=new H.mK(u)
$.fZ=new H.mL(t)},
b5:function(a,b){return a(b)||b},
n1:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.h8(b,C.a.ba(a,c))
return!z.gE(z)}},
dq:function(a,b,c){var z,y,x
H.aV(c)
if(b==="")if(a==="")return c
else{z=a.length
for(y=c,x=0;x<z;++x)y=y+a[x]+c
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
jr:{"^":"b;a,b,c,d,e,f,r,x",n:{
js:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.jr(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
ki:{"^":"b;a,b,c,d,e,f",
ac:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
n:{
ao:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.ki(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
c6:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
f1:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
er:{"^":"a0;a,b",
h:function(a){var z=this.b
if(z==null)return"NullError: "+H.c(this.a)
return"NullError: method not found: '"+H.c(z)+"' on null"}},
iY:{"^":"a0;a,b,c",
h:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.c(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.c(z)+"' ("+H.c(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.c(z)+"' on '"+H.c(y)+"' ("+H.c(this.a)+")"},
n:{
cG:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.iY(a,y,z?null:b.receiver)}}},
kv:{"^":"a0;a",
h:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
n6:{"^":"f:1;a",
$1:function(a){if(!!J.u(a).$isa0)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
fC:{"^":"b;a,b",
h:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
mP:{"^":"f:0;a",
$0:function(){return this.a.$0()}},
mQ:{"^":"f:0;a,b",
$0:function(){return this.a.$1(this.b)}},
mR:{"^":"f:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
mS:{"^":"f:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
mT:{"^":"f:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
f:{"^":"b;",
h:function(a){return"Closure '"+H.cU(this)+"'"},
gep:function(){return this},
gep:function(){return this}},
eP:{"^":"f;"},
jP:{"^":"eP;",
h:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
cz:{"^":"eP;a,b,c,d",
w:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.cz))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gV:function(a){var z,y
z=this.c
if(z==null)y=H.aP(this.a)
else y=typeof z!=="object"?J.V(z):H.aP(z)
z=H.aP(this.b)
if(typeof y!=="number")return y.iC()
return(y^z)>>>0},
h:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.c(this.d)+"' of "+H.bn(z)},
n:{
cA:function(a){return a.a},
dK:function(a){return a.c},
hI:function(){var z=$.bg
if(z==null){z=H.bX("self")
$.bg=z}return z},
bX:function(a){var z,y,x,w,v
z=new H.cz("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
hK:{"^":"a0;a",
h:function(a){return this.a},
n:{
hL:function(a,b){return new H.hK("CastError: Casting value of type "+H.c(a)+" to incompatible type "+H.c(b))}}},
jz:{"^":"a0;a",
h:function(a){return"RuntimeError: "+H.c(this.a)}},
eD:{"^":"b;"},
jA:{"^":"eD;a,b,c,d",
aC:function(a){var z=this.fm(a)
return z==null?!1:H.fV(z,this.b5())},
fm:function(a){var z=J.u(a)
return"$signature" in z?z.$signature():null},
b5:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.u(y)
if(!!x.$isoH)z.v=true
else if(!x.$ise0)z.ret=y.b5()
y=this.b
if(y!=null&&y.length!==0)z.args=H.eC(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.eC(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.fT(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].b5()}z.named=w}return z},
h:function(a){var z,y,x,w,v,u,t,s
z=this.b
if(z!=null)for(y=z.length,x="(",w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.c(u)}else{x="("
w=!1}z=this.c
if(z!=null&&z.length!==0){x=(w?x+", ":x)+"["
for(y=z.length,w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.c(u)}x+="]"}else{z=this.d
if(z!=null){x=(w?x+", ":x)+"{"
t=H.fT(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.c(z[s].b5())+" "+s}x+="}"}}return x+(") -> "+H.c(this.a))},
n:{
eC:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].b5())
return z}}},
e0:{"^":"eD;",
h:function(a){return"dynamic"},
b5:function(){return}},
a9:{"^":"b;a,b,c,d,e,f,r",
gk:function(a){return this.a},
gE:function(a){return this.a===0},
gal:function(){return H.e(new H.j_(this),[H.X(this,0)])},
gen:function(a){return H.c1(this.gal(),new H.iX(this),H.X(this,0),H.X(this,1))},
bU:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.dl(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.dl(y,a)}else return this.hS(a)},
hS:function(a){var z=this.d
if(z==null)return!1
return this.bt(this.ah(z,this.bs(a)),a)>=0},
j:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.ah(z,b)
return y==null?null:y.gaK()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.ah(x,b)
return y==null?null:y.gaK()}else return this.hT(b)},
hT:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.ah(z,this.bs(a))
x=this.bt(y,a)
if(x<0)return
return y[x].gaK()},
F:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.cr()
this.b=z}this.dg(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.cr()
this.c=y}this.dg(y,b,c)}else{x=this.d
if(x==null){x=this.cr()
this.d=x}w=this.bs(b)
v=this.ah(x,w)
if(v==null)this.cB(x,w,[this.cs(b,c)])
else{u=this.bt(v,b)
if(u>=0)v[u].saK(c)
else v.push(this.cs(b,c))}}},
am:function(a,b){if(typeof b==="string")return this.de(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.de(this.c,b)
else return this.hU(b)},
hU:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.ah(z,this.bs(a))
x=this.bt(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.df(w)
return w.gaK()},
aX:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
B:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.a(new P.W(this))
z=z.c}},
dg:function(a,b,c){var z=this.ah(a,b)
if(z==null)this.cB(a,b,this.cs(b,c))
else z.saK(c)},
de:function(a,b){var z
if(a==null)return
z=this.ah(a,b)
if(z==null)return
this.df(z)
this.dq(a,b)
return z.gaK()},
cs:function(a,b){var z,y
z=new H.iZ(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
df:function(a){var z,y
z=a.gf7()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
bs:function(a){return J.V(a)&0x3ffffff},
bt:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.E(a[y].ge3(),b))return y
return-1},
h:function(a){return P.j5(this)},
ah:function(a,b){return a[b]},
cB:function(a,b,c){a[b]=c},
dq:function(a,b){delete a[b]},
dl:function(a,b){return this.ah(a,b)!=null},
cr:function(){var z=Object.create(null)
this.cB(z,"<non-identifier-key>",z)
this.dq(z,"<non-identifier-key>")
return z},
$isiF:1},
iX:{"^":"f:1;a",
$1:function(a){return this.a.j(0,a)}},
iZ:{"^":"b;e3:a<,aK:b@,c,f7:d<"},
j_:{"^":"P;a",
gk:function(a){return this.a.a},
gE:function(a){return this.a.a===0},
gI:function(a){var z,y
z=this.a
y=new H.j0(z,z.r,null,null)
y.c=z.e
return y},
B:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.a(new P.W(z))
y=y.c}},
$isr:1},
j0:{"^":"b;a,b,c,d",
gC:function(){return this.d},
m:function(){var z=this.a
if(this.b!==z.r)throw H.a(new P.W(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
mJ:{"^":"f:1;a",
$1:function(a){return this.a(a)}},
mK:{"^":"f:21;a",
$2:function(a,b){return this.a(a,b)}},
mL:{"^":"f:22;a",
$1:function(a){return this.a(a)}},
iV:{"^":"b;a,b,c,d",
h:function(a){return"RegExp/"+this.a+"/"},
n:{
iW:function(a,b,c,d){var z,y,x,w
H.aV(a)
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.a(new P.a5("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
k4:{"^":"b;a,b,c",
j:function(a,b){if(b!==0)H.p(P.bo(b,null,null))
return this.c}},
m2:{"^":"P;a,b,c",
gI:function(a){return new H.m3(this.a,this.b,this.c,null)},
$asP:function(){return[P.j7]}},
m3:{"^":"b;a,b,c,d",
m:function(){var z,y,x,w,v,u,t
z=this.c
y=this.b
x=y.length
w=this.a
v=w.length
if(z+x>v){this.d=null
return!1}u=w.indexOf(y,z)
if(u<0){this.c=v+1
this.d=null
return!1}t=u+x
this.d=new H.k4(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gC:function(){return this.d}}}],["","",,H,{"^":"",
al:function(){return new P.x("No element")},
iP:function(){return new P.x("Too many elements")},
iO:function(){return new P.x("Too few elements")},
dS:{"^":"f7;a",
gk:function(a){return this.a.length},
j:function(a,b){return C.a.q(this.a,b)},
$asf7:function(){return[P.n]},
$asaM:function(){return[P.n]},
$asi:function(){return[P.n]}},
c0:{"^":"P;",
gI:function(a){return new H.eg(this,this.gk(this),0,null)},
B:function(a,b){var z,y
z=this.gk(this)
for(y=0;y<z;++y){b.$1(this.U(0,y))
if(z!==this.gk(this))throw H.a(new P.W(this))}},
gE:function(a){return this.gk(this)===0},
gO:function(a){if(this.gk(this)===0)throw H.a(H.al())
return this.U(0,this.gk(this)-1)},
P:function(a,b){var z,y,x,w,v
z=this.gk(this)
if(b.length!==0){if(z===0)return""
y=H.c(this.U(0,0))
if(z!==this.gk(this))throw H.a(new P.W(this))
x=new P.a1(y)
for(w=1;w<z;++w){x.a+=b
x.a+=H.c(this.U(0,w))
if(z!==this.gk(this))throw H.a(new P.W(this))}v=x.a
return v.charCodeAt(0)==0?v:v}else{x=new P.a1("")
for(w=0;w<z;++w){x.a+=H.c(this.U(0,w))
if(z!==this.gk(this))throw H.a(new P.W(this))}v=x.a
return v.charCodeAt(0)==0?v:v}},
bC:function(a,b){return this.eI(this,b)},
b0:function(a,b){return H.e(new H.bG(this,b),[H.M(this,"c0",0),null])},
by:function(a,b){var z,y,x
z=H.e([],[H.M(this,"c0",0)])
C.b.sk(z,this.gk(this))
for(y=0;y<this.gk(this);++y){x=this.U(0,y)
if(y>=z.length)return H.d(z,y)
z[y]=x}return z},
b4:function(a){return this.by(a,!0)},
$isr:1},
eg:{"^":"b;a,b,c,d",
gC:function(){return this.d},
m:function(){var z,y,x,w
z=this.a
y=J.R(z)
x=y.gk(z)
if(this.b!==x)throw H.a(new P.W(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.U(z,w);++this.c
return!0}},
eh:{"^":"P;a,b",
gI:function(a){var z=new H.j4(null,J.au(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gk:function(a){return J.N(this.a)},
gE:function(a){return J.cq(this.a)},
gO:function(a){return this.aB(J.dz(this.a))},
aB:function(a){return this.b.$1(a)},
$asP:function(a,b){return[b]},
n:{
c1:function(a,b,c,d){if(!!J.u(a).$isr)return H.e(new H.e1(a,b),[c,d])
return H.e(new H.eh(a,b),[c,d])}}},
e1:{"^":"eh;a,b",$isr:1},
j4:{"^":"c_;a,b,c",
m:function(){var z=this.b
if(z.m()){this.a=this.aB(z.gC())
return!0}this.a=null
return!1},
gC:function(){return this.a},
aB:function(a){return this.c.$1(a)}},
bG:{"^":"c0;a,b",
gk:function(a){return J.N(this.a)},
U:function(a,b){return this.aB(J.hj(this.a,b))},
aB:function(a){return this.b.$1(a)},
$asc0:function(a,b){return[b]},
$asP:function(a,b){return[b]},
$isr:1},
d8:{"^":"P;a,b",
gI:function(a){var z=new H.l6(J.au(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
l6:{"^":"c_;a,b",
m:function(){for(var z=this.a;z.m();)if(this.aB(z.gC())===!0)return!0
return!1},
gC:function(){return this.a.gC()},
aB:function(a){return this.b.$1(a)}},
eO:{"^":"P;a,b",
gI:function(a){var z=new H.k7(J.au(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
n:{
k6:function(a,b,c){if(b<0)throw H.a(P.aG(b))
if(!!J.u(a).$isr)return H.e(new H.ib(a,b),[c])
return H.e(new H.eO(a,b),[c])}}},
ib:{"^":"eO;a,b",
gk:function(a){var z,y
z=J.N(this.a)
y=this.b
if(z>y)return y
return z},
$isr:1},
k7:{"^":"c_;a,b",
m:function(){if(--this.b>=0)return this.a.m()
this.b=-1
return!1},
gC:function(){if(this.b<0)return
return this.a.gC()}},
eI:{"^":"P;a,b",
gI:function(a){var z=new H.jN(J.au(this.a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
dc:function(a,b,c){var z=this.b
if(z<0)H.p(P.L(z,0,null,"count",null))},
n:{
jM:function(a,b,c){var z
if(!!J.u(a).$isr){z=H.e(new H.ia(a,b),[c])
z.dc(a,b,c)
return z}return H.jL(a,b,c)},
jL:function(a,b,c){var z=H.e(new H.eI(a,b),[c])
z.dc(a,b,c)
return z}}},
ia:{"^":"eI;a,b",
gk:function(a){var z=J.N(this.a)-this.b
if(z>=0)return z
return 0},
$isr:1},
jN:{"^":"c_;a,b",
m:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.m()
this.b=0
return z.m()},
gC:function(){return this.a.gC()}},
ea:{"^":"b;",
sk:function(a,b){throw H.a(new P.w("Cannot change the length of a fixed-length list"))},
p:function(a,b){throw H.a(new P.w("Cannot add to a fixed-length list"))}},
kw:{"^":"b;",
F:function(a,b,c){throw H.a(new P.w("Cannot modify an unmodifiable list"))},
sk:function(a,b){throw H.a(new P.w("Cannot change the length of an unmodifiable list"))},
p:function(a,b){throw H.a(new P.w("Cannot add to an unmodifiable list"))},
$isi:1,
$asi:null,
$isr:1},
f7:{"^":"aM+kw;",$isi:1,$asi:null,$isr:1}}],["","",,H,{"^":"",
fT:function(a){var z=H.e(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{"^":"",
l8:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.mw()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.b9(new P.la(z),1)).observe(y,{childList:true})
return new P.l9(z,y,x)}else if(self.setImmediate!=null)return P.mx()
return P.my()},
oI:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.b9(new P.lb(a),0))},"$1","mw",2,0,4],
oJ:[function(a){++init.globalState.f.b
self.setImmediate(H.b9(new P.lc(a),0))},"$1","mx",2,0,4],
oK:[function(a){P.cZ(C.m,a)},"$1","my",2,0,4],
fL:function(a,b){var z=H.bQ()
z=H.b7(z,[z,z]).aC(a)
if(z){b.toString
return a}else{b.toString
return a}},
mo:function(a,b,c){$.y.toString
a.aR(b,c)},
mq:function(){var z,y
for(;z=$.b4,z!=null;){$.bv=null
y=z.b
$.b4=y
if(y==null)$.bu=null
z.a.$0()}},
oY:[function(){$.dh=!0
try{P.mq()}finally{$.bv=null
$.dh=!1
if($.b4!=null)$.$get$d9().$1(P.fS())}},"$0","fS",0,0,2],
fP:function(a){var z=new P.fl(a,null)
if($.b4==null){$.bu=z
$.b4=z
if(!$.dh)$.$get$d9().$1(P.fS())}else{$.bu.b=z
$.bu=z}},
mt:function(a){var z,y,x
z=$.b4
if(z==null){P.fP(a)
$.bv=$.bu
return}y=new P.fl(a,null)
x=$.bv
if(x==null){y.b=z
$.bv=y
$.b4=y}else{y.b=x.b
x.b=y
$.bv=y
if(y.b==null)$.bu=y}},
h_:function(a){var z=$.y
if(C.e===z){P.cd(null,null,C.e,a)
return}z.toString
P.cd(null,null,z,z.cD(a,!0))},
ms:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.D(u)
z=t
y=H.S(u)
$.y.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.at(x)
w=t
v=x.gao()
c.$2(w,v)}}},
fI:function(a,b,c,d){var z=a.bS()
if(!!J.u(z).$isaK)z.c3(new P.mk(b,c,d))
else b.aR(c,d)},
mj:function(a,b,c,d){$.y.toString
P.fI(a,b,c,d)},
mh:function(a,b){return new P.mi(a,b)},
ml:function(a,b,c){var z=a.bS()
if(!!J.u(z).$isaK)z.c3(new P.mm(b,c))
else b.ar(c)},
mg:function(a,b,c){$.y.toString
a.cc(b,c)},
kg:function(a,b){var z=$.y
if(z===C.e){z.toString
return P.cZ(a,b)}return P.cZ(a,z.cD(b,!0))},
cZ:function(a,b){var z=C.c.bl(a.a,1000)
return H.kd(z<0?0:z,b)},
bP:function(a,b,c,d,e){var z={}
z.a=d
P.mt(new P.mr(z,e))},
fM:function(a,b,c,d){var z,y
y=$.y
if(y===c)return d.$0()
$.y=c
z=y
try{y=d.$0()
return y}finally{$.y=z}},
fO:function(a,b,c,d,e){var z,y
y=$.y
if(y===c)return d.$1(e)
$.y=c
z=y
try{y=d.$1(e)
return y}finally{$.y=z}},
fN:function(a,b,c,d,e,f){var z,y
y=$.y
if(y===c)return d.$2(e,f)
$.y=c
z=y
try{y=d.$2(e,f)
return y}finally{$.y=z}},
cd:function(a,b,c,d){var z=C.e!==c
if(z)d=c.cD(d,!(!z||!1))
P.fP(d)},
la:{"^":"f:1;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
l9:{"^":"f:40;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
lb:{"^":"f:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
lc:{"^":"f:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
aK:{"^":"b;"},
fu:{"^":"b;ct:a<,b,c,d,e",
gh0:function(){return this.b.b},
ge2:function(){return(this.c&1)!==0},
ghP:function(){return(this.c&2)!==0},
ghQ:function(){return this.c===6},
ge1:function(){return this.c===8},
gfK:function(){return this.d},
gh_:function(){return this.d}},
ar:{"^":"b;bk:a@,b,fP:c<",
gfv:function(){return this.a===2},
gcq:function(){return this.a>=4},
ei:function(a,b){var z,y
z=$.y
if(z!==C.e){z.toString
if(b!=null)b=P.fL(b,z)}y=H.e(new P.ar(0,z,null),[null])
this.cd(new P.fu(null,y,b==null?1:3,a,b))
return y},
ip:function(a){return this.ei(a,null)},
c3:function(a){var z,y
z=$.y
y=new P.ar(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.e)z.toString
this.cd(new P.fu(null,y,8,a,null))
return y},
cd:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gcq()){y.cd(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.cd(null,null,z,new P.lt(this,a))}},
dD:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gct()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gcq()){v.dD(a)
return}this.a=v.a
this.c=v.c}z.a=this.bL(a)
y=this.b
y.toString
P.cd(null,null,y,new P.ly(z,this))}},
bK:function(){var z=this.c
this.c=null
return this.bL(z)},
bL:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gct()
z.a=y}return y},
ar:function(a){var z
if(!!J.u(a).$isaK)P.fv(a,this)
else{z=this.bK()
this.a=4
this.c=a
P.b2(this,z)}},
fg:function(a){var z=this.bK()
this.a=4
this.c=a
P.b2(this,z)},
aR:[function(a,b){var z=this.bK()
this.a=8
this.c=new P.bz(a,b)
P.b2(this,z)},function(a){return this.aR(a,null)},"ff","$2","$1","gbc",2,2,24,0],
$isaK:1,
n:{
lu:function(a,b){var z,y,x,w
b.sbk(1)
try{a.ei(new P.lv(b),new P.lw(b))}catch(x){w=H.D(x)
z=w
y=H.S(x)
P.h_(new P.lx(b,z,y))}},
fv:function(a,b){var z,y,x
for(;a.gfv();)a=a.c
z=a.gcq()
y=b.c
if(z){b.c=null
x=b.bL(y)
b.a=a.a
b.c=a.c
P.b2(b,x)}else{b.a=2
b.c=a
a.dD(y)}},
b2:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
z=y.b
y=J.at(v)
x=v.gao()
z.toString
P.bP(null,null,z,y,x)}return}for(;b.gct()!=null;b=u){u=b.a
b.a=null
P.b2(z.a,b)}t=z.a.c
x.a=w
x.b=t
y=!w
if(!y||b.ge2()||b.ge1()){s=b.gh0()
if(w){r=z.a.b
r.toString
r=r==null?s==null:r===s
if(!r)s.toString
else r=!0
r=!r}else r=!1
if(r){y=z.a
v=y.c
y=y.b
x=J.at(v)
r=v.gao()
y.toString
P.bP(null,null,y,x,r)
return}q=$.y
if(q==null?s!=null:q!==s)$.y=s
else q=null
if(b.ge1())new P.lB(z,x,w,b,s).$0()
else if(y){if(b.ge2())new P.lA(x,w,b,t,s).$0()}else if(b.ghP())new P.lz(z,x,b,s).$0()
if(q!=null)$.y=q
y=x.b
r=J.u(y)
if(!!r.$isaK){p=b.b
if(!!r.$isar)if(y.a>=4){o=p.c
p.c=null
b=p.bL(o)
p.a=y.a
p.c=y.c
z.a=y
continue}else P.fv(y,p)
else P.lu(y,p)
return}}p=b.b
b=p.bK()
y=x.a
x=x.b
if(!y){p.a=4
p.c=x}else{p.a=8
p.c=x}z.a=p
y=p}}}},
lt:{"^":"f:0;a,b",
$0:function(){P.b2(this.a,this.b)}},
ly:{"^":"f:0;a,b",
$0:function(){P.b2(this.b,this.a.a)}},
lv:{"^":"f:1;a",
$1:function(a){this.a.fg(a)}},
lw:{"^":"f:25;a",
$2:function(a,b){this.a.aR(a,b)},
$1:function(a){return this.$2(a,null)}},
lx:{"^":"f:0;a,b,c",
$0:function(){this.a.aR(this.b,this.c)}},
lA:{"^":"f:2;a,b,c,d,e",
$0:function(){var z,y,x,w
try{x=this.a
x.b=this.e.cY(this.c.gfK(),this.d)
x.a=!1}catch(w){x=H.D(w)
z=x
y=H.S(w)
x=this.a
x.b=new P.bz(z,y)
x.a=!0}}},
lz:{"^":"f:2;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a.a.c
y=!0
r=this.c
if(r.ghQ()){x=r.d
try{y=this.d.cY(x,J.at(z))}catch(q){r=H.D(q)
w=r
v=H.S(q)
r=J.at(z)
p=w
o=(r==null?p==null:r===p)?z:new P.bz(w,v)
r=this.b
r.b=o
r.a=!0
return}}u=r.e
if(y===!0&&u!=null)try{r=u
p=H.bQ()
p=H.b7(p,[p,p]).aC(r)
n=this.d
m=this.b
if(p)m.b=n.ik(u,J.at(z),z.gao())
else m.b=n.cY(u,J.at(z))
m.a=!1}catch(q){r=H.D(q)
t=r
s=H.S(q)
r=J.at(z)
p=t
o=(r==null?p==null:r===p)?z:new P.bz(t,s)
r=this.b
r.b=o
r.a=!0}}},
lB:{"^":"f:2;a,b,c,d,e",
$0:function(){var z,y,x,w,v,u
z=null
try{z=this.e.ef(this.d.gh_())}catch(w){v=H.D(w)
y=v
x=H.S(w)
if(this.c){v=J.at(this.a.a.c)
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.bz(y,x)
u.a=!0
return}if(!!J.u(z).$isaK){if(z instanceof P.ar&&z.gbk()>=4){if(z.gbk()===8){v=this.b
v.b=z.gfP()
v.a=!0}return}v=this.b
v.b=z.ip(new P.lC(this.a.a))
v.a=!1}}},
lC:{"^":"f:1;a",
$1:function(a){return this.a}},
fl:{"^":"b;a,b"},
a6:{"^":"b;",
b0:function(a,b){return H.e(new P.lP(b,this),[H.M(this,"a6",0),null])},
P:function(a,b){var z,y,x
z={}
y=H.e(new P.ar(0,$.y,null),[P.o])
x=new P.a1("")
z.a=null
z.b=!0
z.a=this.a9(new P.jW(z,this,b,y,x),!0,new P.jX(y,x),new P.jY(y))
return y},
B:function(a,b){var z,y
z={}
y=H.e(new P.ar(0,$.y,null),[null])
z.a=null
z.a=this.a9(new P.jS(z,this,b,y),!0,new P.jT(y),y.gbc())
return y},
gk:function(a){var z,y
z={}
y=H.e(new P.ar(0,$.y,null),[P.n])
z.a=0
this.a9(new P.k0(z),!0,new P.k1(z,y),y.gbc())
return y},
gE:function(a){var z,y
z={}
y=H.e(new P.ar(0,$.y,null),[P.b6])
z.a=null
z.a=this.a9(new P.jU(z,y),!0,new P.jV(y),y.gbc())
return y},
b4:function(a){var z,y
z=H.e([],[H.M(this,"a6",0)])
y=H.e(new P.ar(0,$.y,null),[[P.i,H.M(this,"a6",0)]])
this.a9(new P.k2(this,z),!0,new P.k3(z,y),y.gbc())
return y},
gO:function(a){var z,y
z={}
y=H.e(new P.ar(0,$.y,null),[H.M(this,"a6",0)])
z.a=null
z.b=!1
this.a9(new P.jZ(z,this),!0,new P.k_(z,y),y.gbc())
return y}},
jW:{"^":"f;a,b,c,d,e",
$1:function(a){var z,y,x,w,v
x=this.a
if(!x.b)this.e.a+=this.c
x.b=!1
try{this.e.a+=H.c(a)}catch(w){v=H.D(w)
z=v
y=H.S(w)
P.mj(x.a,this.d,z,y)}},
$signature:function(){return H.b8(function(a){return{func:1,args:[a]}},this.b,"a6")}},
jY:{"^":"f:1;a",
$1:function(a){this.a.ff(a)}},
jX:{"^":"f:0;a,b",
$0:function(){var z=this.b.a
this.a.ar(z.charCodeAt(0)==0?z:z)}},
jS:{"^":"f;a,b,c,d",
$1:function(a){P.ms(new P.jQ(this.c,a),new P.jR(),P.mh(this.a.a,this.d))},
$signature:function(){return H.b8(function(a){return{func:1,args:[a]}},this.b,"a6")}},
jQ:{"^":"f:0;a,b",
$0:function(){return this.a.$1(this.b)}},
jR:{"^":"f:1;",
$1:function(a){}},
jT:{"^":"f:0;a",
$0:function(){this.a.ar(null)}},
k0:{"^":"f:1;a",
$1:function(a){++this.a.a}},
k1:{"^":"f:0;a,b",
$0:function(){this.b.ar(this.a.a)}},
jU:{"^":"f:1;a,b",
$1:function(a){P.ml(this.a.a,this.b,!1)}},
jV:{"^":"f:0;a",
$0:function(){this.a.ar(!0)}},
k2:{"^":"f;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.b8(function(a){return{func:1,args:[a]}},this.a,"a6")}},
k3:{"^":"f:0;a,b",
$0:function(){this.b.ar(this.a)}},
jZ:{"^":"f;a,b",
$1:function(a){var z=this.a
z.b=!0
z.a=a},
$signature:function(){return H.b8(function(a){return{func:1,args:[a]}},this.b,"a6")}},
k_:{"^":"f:0;a,b",
$0:function(){var z,y,x,w
x=this.a
if(x.b){this.b.ar(x.a)
return}try{x=H.al()
throw H.a(x)}catch(w){x=H.D(w)
z=x
y=H.S(w)
P.mo(this.b,z,y)}}},
eL:{"^":"b;"},
cE:{"^":"b;"},
oP:{"^":"b;"},
c9:{"^":"b;bk:e@",
cU:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.dU()
if((z&4)===0&&(this.e&32)===0)this.dw(this.gcv())},
ea:function(a){return this.cU(a,null)},
b3:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gE(z)}else z=!1
if(z)this.r.c5(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.dw(this.gcz())}}}},
bS:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)!==0)return this.f
this.cf()
return this.f},
cf:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.dU()
if((this.e&32)===0)this.r=null
this.f=this.cu()},
bG:["aq",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.dI(a)
else this.ce(new P.ll(a,null))}],
cc:["az",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.dK(a,b)
else this.ce(new P.ln(a,b,null))}],
fb:["aA",function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.dJ()
else this.ce(C.B)}],
cw:[function(){},"$0","gcv",0,0,2],
cA:[function(){},"$0","gcz",0,0,2],
cu:function(){return},
ce:function(a){var z,y
z=this.r
if(z==null){z=new P.m1(null,null,0)
this.r=z}z.p(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.c5(this)}},
dI:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.cZ(this.a,a)
this.e=(this.e&4294967263)>>>0
this.cg((z&4)!==0)},
dK:function(a,b){var z,y
z=this.e
y=new P.lf(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.cf()
z=this.f
if(!!J.u(z).$isaK)z.c3(y)
else y.$0()}else{y.$0()
this.cg((z&4)!==0)}},
dJ:function(){var z,y
z=new P.le(this)
this.cf()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.u(y).$isaK)y.c3(z)
else z.$0()},
dw:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.cg((z&4)!==0)},
cg:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gE(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gE(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.cw()
else this.cA()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.c5(this)},
dd:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.fL(b,z)
this.c=c}},
lf:{"^":"f:2;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.bQ()
x=H.b7(x,[x,x]).aC(y)
w=z.d
v=this.b
u=z.b
if(x)w.il(u,v,this.c)
else w.cZ(u,v)
z.e=(z.e&4294967263)>>>0}},
le:{"^":"f:2;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.eg(z.c)
z.e=(z.e&4294967263)>>>0}},
fp:{"^":"b;bZ:a@"},
ll:{"^":"fp;b,a",
cV:function(a){a.dI(this.b)}},
ln:{"^":"fp;bp:b>,ao:c<,a",
cV:function(a){a.dK(this.b,this.c)}},
lm:{"^":"b;",
cV:function(a){a.dJ()},
gbZ:function(){return},
sbZ:function(a){throw H.a(new P.x("No events after a done."))}},
lR:{"^":"b;bk:a@",
c5:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.h_(new P.lS(this,a))
this.a=1},
dU:function(){if(this.a===1)this.a=3}},
lS:{"^":"f:0;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gbZ()
z.b=w
if(w==null)z.c=null
x.cV(this.b)}},
m1:{"^":"lR;b,c,a",
gE:function(a){return this.c==null},
p:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sbZ(b)
this.c=b}}},
mk:{"^":"f:0;a,b,c",
$0:function(){return this.a.aR(this.b,this.c)}},
mi:{"^":"f:26;a,b",
$2:function(a,b){return P.fI(this.a,this.b,a,b)}},
mm:{"^":"f:0;a,b",
$0:function(){return this.a.ar(this.b)}},
da:{"^":"a6;",
a9:function(a,b,c,d){return this.fi(a,d,c,!0===b)},
bW:function(a,b,c){return this.a9(a,null,b,c)},
fi:function(a,b,c,d){return P.ls(this,a,b,c,d,H.M(this,"da",0),H.M(this,"da",1))},
dz:function(a,b){b.bG(a)},
$asa6:function(a,b){return[b]}},
ft:{"^":"c9;x,y,a,b,c,d,e,f,r",
bG:function(a){if((this.e&2)!==0)return
this.aq(a)},
cc:function(a,b){if((this.e&2)!==0)return
this.az(a,b)},
cw:[function(){var z=this.y
if(z==null)return
z.ea(0)},"$0","gcv",0,0,2],
cA:[function(){var z=this.y
if(z==null)return
z.b3()},"$0","gcz",0,0,2],
cu:function(){var z=this.y
if(z!=null){this.y=null
return z.bS()}return},
fs:[function(a){this.x.dz(a,this)},"$1","gcm",2,0,function(){return H.b8(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"ft")}],
dA:[function(a,b){this.cc(a,b)},"$2","gco",4,0,27],
ft:[function(){this.fb()},"$0","gcn",0,0,2],
f2:function(a,b,c,d,e,f,g){var z,y
z=this.gcm()
y=this.gco()
this.y=this.x.a.bW(z,this.gcn(),y)},
$asc9:function(a,b){return[b]},
n:{
ls:function(a,b,c,d,e,f,g){var z=$.y
z=H.e(new P.ft(a,null,null,null,null,z,e?1:0,null,null),[f,g])
z.dd(b,c,d,e,g)
z.f2(a,b,c,d,e,f,g)
return z}}},
lP:{"^":"da;b,a",
dz:function(a,b){var z,y,x,w,v
z=null
try{z=this.fZ(a)}catch(w){v=H.D(w)
y=v
x=H.S(w)
P.mg(b,y,x)
return}b.bG(z)},
fZ:function(a){return this.b.$1(a)}},
lr:{"^":"b;a",
p:function(a,b){var z=this.a
if((z.e&2)!==0)H.p(new P.x("Stream is already closed"))
z.aq(b)},
dQ:function(a,b){var z=this.a
if((z.e&2)!==0)H.p(new P.x("Stream is already closed"))
z.az(a,b)},
Z:function(a){var z=this.a
if((z.e&2)!==0)H.p(new P.x("Stream is already closed"))
z.aA()}},
fB:{"^":"c9;x,y,a,b,c,d,e,f,r",
bG:function(a){if((this.e&2)!==0)throw H.a(new P.x("Stream is already closed"))
this.aq(a)},
cw:[function(){},"$0","gcv",0,0,2],
cA:[function(){},"$0","gcz",0,0,2],
cu:function(){return},
fs:[function(a){var z,y,x,w
try{J.bc(this.x,a)}catch(x){w=H.D(x)
z=w
y=H.S(x)
if((this.e&2)!==0)H.p(new P.x("Stream is already closed"))
this.az(z,y)}},"$1","gcm",2,0,function(){return H.b8(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"fB")}],
dA:[function(a,b){var z,y,x,w,v
try{this.x.dQ(a,b)}catch(x){w=H.D(x)
z=w
y=H.S(x)
w=z
v=a
if(w==null?v==null:w===v){if((this.e&2)!==0)H.p(new P.x("Stream is already closed"))
this.az(a,b)}else{if((this.e&2)!==0)H.p(new P.x("Stream is already closed"))
this.az(z,y)}}},function(a){return this.dA(a,null)},"iD","$2","$1","gco",2,2,28,0],
ft:[function(){var z,y,x,w
try{this.y=null
J.he(this.x)}catch(x){w=H.D(x)
z=w
y=H.S(x)
if((this.e&2)!==0)H.p(new P.x("Stream is already closed"))
this.az(z,y)}},"$0","gcn",0,0,2],
$asc9:function(a,b){return[b]}},
fn:{"^":"a6;a,b",
a9:function(a,b,c,d){var z,y,x
b=!0===b
z=$.y
y=H.e(new P.fB(null,null,null,null,null,z,b?1:0,null,null),[null,null])
y.dd(a,d,c,b,null)
y.x=this.a.$1(H.e(new P.lr(y),[null]))
z=y.gcm()
x=y.gco()
y.y=this.b.bW(z,y.gcn(),x)
return y},
bW:function(a,b,c){return this.a9(a,null,b,c)},
$asa6:function(a,b){return[b]}},
bz:{"^":"b;bp:a>,ao:b<",
h:function(a){return H.c(this.a)},
$isa0:1},
me:{"^":"b;"},
mr:{"^":"f:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.es()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.a(z)
x=H.a(z)
x.stack=J.C(y)
throw x}},
lU:{"^":"me;",
eg:function(a){var z,y,x,w
try{if(C.e===$.y){x=a.$0()
return x}x=P.fM(null,null,this,a)
return x}catch(w){x=H.D(w)
z=x
y=H.S(w)
return P.bP(null,null,this,z,y)}},
cZ:function(a,b){var z,y,x,w
try{if(C.e===$.y){x=a.$1(b)
return x}x=P.fO(null,null,this,a,b)
return x}catch(w){x=H.D(w)
z=x
y=H.S(w)
return P.bP(null,null,this,z,y)}},
il:function(a,b,c){var z,y,x,w
try{if(C.e===$.y){x=a.$2(b,c)
return x}x=P.fN(null,null,this,a,b,c)
return x}catch(w){x=H.D(w)
z=x
y=H.S(w)
return P.bP(null,null,this,z,y)}},
cD:function(a,b){if(b)return new P.lV(this,a)
else return new P.lW(this,a)},
ha:function(a,b){return new P.lX(this,a)},
j:function(a,b){return},
ef:function(a){if($.y===C.e)return a.$0()
return P.fM(null,null,this,a)},
cY:function(a,b){if($.y===C.e)return a.$1(b)
return P.fO(null,null,this,a,b)},
ik:function(a,b,c){if($.y===C.e)return a.$2(b,c)
return P.fN(null,null,this,a,b,c)}},
lV:{"^":"f:0;a,b",
$0:function(){return this.a.eg(this.b)}},
lW:{"^":"f:0;a,b",
$0:function(){return this.a.ef(this.b)}},
lX:{"^":"f:1;a,b",
$1:function(a){return this.a.cZ(this.b,a)}}}],["","",,P,{"^":"",
cI:function(){return H.e(new H.a9(0,null,null,null,null,null,0),[null,null])},
b_:function(a){return H.mD(a,H.e(new H.a9(0,null,null,null,null,null,0),[null,null]))},
iN:function(a,b,c){var z,y
if(P.di(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bw()
y.push(a)
try{P.mp(a,z)}finally{if(0>=y.length)return H.d(y,-1)
y.pop()}y=P.cW(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
bZ:function(a,b,c){var z,y,x
if(P.di(a))return b+"..."+c
z=new P.a1(b)
y=$.$get$bw()
y.push(a)
try{x=z
x.a=P.cW(x.gaS(),a,", ")}finally{if(0>=y.length)return H.d(y,-1)
y.pop()}y=z
y.a=y.gaS()+c
y=z.gaS()
return y.charCodeAt(0)==0?y:y},
di:function(a){var z,y
for(z=0;y=$.$get$bw(),z<y.length;++z)if(a===y[z])return!0
return!1},
mp:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gI(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.m())return
w=H.c(z.gC())
b.push(w)
y+=w.length+2;++x}if(!z.m()){if(x<=5)return
if(0>=b.length)return H.d(b,-1)
v=b.pop()
if(0>=b.length)return H.d(b,-1)
u=b.pop()}else{t=z.gC();++x
if(!z.m()){if(x<=4){b.push(H.c(t))
return}v=H.c(t)
if(0>=b.length)return H.d(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gC();++x
for(;z.m();t=s,s=r){r=z.gC();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.d(b,-1)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.c(t)
v=H.c(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.d(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
am:function(a,b,c,d){return H.e(new P.lG(0,null,null,null,null,null,0),[d])},
ef:function(a,b){var z,y
z=P.am(null,null,null,b)
for(y=J.au(a);y.m();)z.p(0,y.gC())
return z},
j5:function(a){var z,y,x
z={}
if(P.di(a))return"{...}"
y=new P.a1("")
try{$.$get$bw().push(a)
x=y
x.a=x.gaS()+"{"
z.a=!0
J.dw(a,new P.j6(z,y))
z=y
z.a=z.gaS()+"}"}finally{z=$.$get$bw()
if(0>=z.length)return H.d(z,-1)
z.pop()}z=y.gaS()
return z.charCodeAt(0)==0?z:z},
fA:{"^":"a9;a,b,c,d,e,f,r",
bs:function(a){return H.mX(a)&0x3ffffff},
bt:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].ge3()
if(x==null?b==null:x===b)return y}return-1},
n:{
bs:function(a,b){return H.e(new P.fA(0,null,null,null,null,null,0),[a,b])}}},
lG:{"^":"lD;a,b,c,d,e,f,r",
gI:function(a){var z=new P.bN(this,this.r,null,null)
z.c=this.e
return z},
gk:function(a){return this.a},
gE:function(a){return this.a===0},
a0:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.fh(b)},
fh:function(a){var z=this.d
if(z==null)return!1
return this.bI(z[this.bH(a)],a)>=0},
e7:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.a0(0,a)?a:null
else return this.fA(a)},
fA:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.bH(a)]
x=this.bI(y,a)
if(x<0)return
return J.as(y,x).gds()},
B:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.a(new P.W(this))
z=z.b}},
gO:function(a){var z=this.f
if(z==null)throw H.a(new P.x("No elements"))
return z.a},
p:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.dk(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.dk(x,b)}else return this.ag(b)},
ag:function(a){var z,y,x
z=this.d
if(z==null){z=P.lI()
this.d=z}y=this.bH(a)
x=z[y]
if(x==null)z[y]=[this.ci(a)]
else{if(this.bI(x,a)>=0)return!1
x.push(this.ci(a))}return!0},
am:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.dE(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.dE(this.c,b)
else return this.fM(b)},
fM:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.bH(a)]
x=this.bI(y,a)
if(x<0)return!1
this.dM(y.splice(x,1)[0])
return!0},
aX:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
dk:function(a,b){if(a[b]!=null)return!1
a[b]=this.ci(b)
return!0},
dE:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.dM(z)
delete a[b]
return!0},
ci:function(a){var z,y
z=new P.lH(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
dM:function(a){var z,y
z=a.gfL()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
bH:function(a){return J.V(a)&0x3ffffff},
bI:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.E(a[y].gds(),b))return y
return-1},
$isr:1,
n:{
lI:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
lH:{"^":"b;ds:a<,b,fL:c<"},
bN:{"^":"b;a,b,c,d",
gC:function(){return this.d},
m:function(){var z=this.a
if(this.b!==z.r)throw H.a(new P.W(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
lD:{"^":"jB;"},
aM:{"^":"jh;"},
jh:{"^":"b+ae;",$isi:1,$asi:null,$isr:1},
ae:{"^":"b;",
gI:function(a){return new H.eg(a,this.gk(a),0,null)},
U:function(a,b){return this.j(a,b)},
B:function(a,b){var z,y
z=this.gk(a)
for(y=0;y<z;++y){b.$1(this.j(a,y))
if(z!==this.gk(a))throw H.a(new P.W(a))}},
gE:function(a){return this.gk(a)===0},
gO:function(a){if(this.gk(a)===0)throw H.a(H.al())
return this.j(a,this.gk(a)-1)},
P:function(a,b){var z
if(this.gk(a)===0)return""
z=P.cW("",a,b)
return z.charCodeAt(0)==0?z:z},
bC:function(a,b){return H.e(new H.d8(a,b),[H.M(a,"ae",0)])},
b0:function(a,b){return H.e(new H.bG(a,b),[null,null])},
by:function(a,b){var z,y,x
z=H.e([],[H.M(a,"ae",0)])
C.b.sk(z,this.gk(a))
for(y=0;y<this.gk(a);++y){x=this.j(a,y)
if(y>=z.length)return H.d(z,y)
z[y]=x}return z},
b4:function(a){return this.by(a,!0)},
p:function(a,b){var z=this.gk(a)
this.sk(a,z+1)
this.F(a,z,b)},
aZ:function(a,b,c){var z
if(c>=this.gk(a))return-1
for(z=c;z<this.gk(a);++z)if(J.E(this.j(a,z),b))return z
return-1},
K:function(a,b){return this.aZ(a,b,0)},
h:function(a){return P.bZ(a,"[","]")},
$isi:1,
$asi:null,
$isr:1},
m7:{"^":"b;",
F:function(a,b,c){throw H.a(new P.w("Cannot modify unmodifiable map"))}},
j3:{"^":"b;",
j:function(a,b){return J.as(this.a,b)},
F:function(a,b,c){J.co(this.a,b,c)},
B:function(a,b){J.dw(this.a,b)},
gE:function(a){return J.cq(this.a)},
gk:function(a){return J.N(this.a)},
h:function(a){return J.C(this.a)}},
kx:{"^":"j3+m7;a"},
j6:{"^":"f:7;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.c(a)
z.a=y+": "
z.a+=H.c(b)}},
j1:{"^":"P;a,b,c,d",
gI:function(a){return new P.lJ(this,this.c,this.d,this.b,null)},
B:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.d(x,y)
b.$1(x[y])
if(z!==this.d)H.p(new P.W(this))}},
gE:function(a){return this.b===this.c},
gk:function(a){return(this.c-this.b&this.a.length-1)>>>0},
gO:function(a){var z,y,x
z=this.b
y=this.c
if(z===y)throw H.a(H.al())
z=this.a
x=z.length
y=(y-1&x-1)>>>0
if(y<0||y>=x)return H.d(z,y)
return z[y]},
p:function(a,b){this.ag(b)},
aX:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.d(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
h:function(a){return P.bZ(this,"{","}")},
ed:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.a(H.al());++this.d
y=this.a
x=y.length
if(z>=x)return H.d(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
ag:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.d(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.dv();++this.d},
dv:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.e(z,[H.X(this,0)])
z=this.a
x=this.b
w=z.length-x
C.b.d7(y,0,w,z,x)
C.b.d7(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
eP:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.e(z,[b])},
$isr:1,
n:{
cJ:function(a,b){var z=H.e(new P.j1(null,0,0,0),[b])
z.eP(a,b)
return z}}},
lJ:{"^":"b;a,b,c,d,e",
gC:function(){return this.e},
m:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.p(new P.W(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.d(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
jE:{"^":"b;",
gE:function(a){return this.a===0},
au:function(a,b){var z
for(z=J.au(b);z.m();)this.p(0,z.gC())},
b0:function(a,b){return H.e(new H.e1(this,b),[H.X(this,0),null])},
h:function(a){return P.bZ(this,"{","}")},
B:function(a,b){var z
for(z=new P.bN(this,this.r,null,null),z.c=this.e;z.m();)b.$1(z.d)},
P:function(a,b){var z,y,x
z=new P.bN(this,this.r,null,null)
z.c=this.e
if(!z.m())return""
y=new P.a1("")
if(b===""){do y.a+=H.c(z.d)
while(z.m())}else{y.a=H.c(z.d)
for(;z.m();){y.a+=b
y.a+=H.c(z.d)}}x=y.a
return x.charCodeAt(0)==0?x:x},
gO:function(a){var z,y
z=new P.bN(this,this.r,null,null)
z.c=this.e
if(!z.m())throw H.a(H.al())
do y=z.d
while(z.m())
return y},
$isr:1},
jB:{"^":"jE;"}}],["","",,P,{"^":"",dN:{"^":"dQ;",
$asdQ:function(){return[[P.i,P.n]]}},hJ:{"^":"dN;"},lg:{"^":"hJ;a",
p:function(a,b){var z=this.a.a
if((z.e&2)!==0)H.p(new P.x("Stream is already closed"))
z.aq(b)
return},
Z:function(a){var z=this.a.a
if((z.e&2)!==0)H.p(new P.x("Stream is already closed"))
z.aA()
return}},av:{"^":"hU;",
b9:function(a){throw H.a(new P.w("This converter does not support chunked conversions: "+this.h(0)))},
a2:["d9",function(a){return H.e(new P.fn(new P.hM(this),a),[null,null])}]},hM:{"^":"f;a",
$1:function(a){var z=this.a
return H.e(new P.fo(a,z.b9(a)),[H.M(z,"av",2),H.M(z,"av",3)])},
$signature:function(){return H.b8(function(a,b,c,d){return{func:1,args:[[P.cE,d]]}},this.a,"av")}},dQ:{"^":"b;"},fo:{"^":"b;a,b",
p:function(a,b){return this.b.p(0,b)},
dQ:function(a,b){var z=this.a.a
if((z.e&2)!==0)H.p(new P.x("Stream is already closed"))
z.az(a,b)},
Z:function(a){return this.b.Z(0)}},hR:{"^":"b;"},hU:{"^":"b;",
a2:function(a){return H.e(new P.fn(new P.hV(this),a),[null,null])}},hV:{"^":"f:29;a",
$1:function(a){return H.e(new P.fo(a,this.a.b9(a)),[null,null])}},id:{"^":"hR;"},iu:{"^":"b;a,b,c,d,e",
h:function(a){return this.a}},it:{"^":"av;a",
dm:function(a,b,c){var z,y,x,w,v,u,t,s
if(typeof c!=="number")return H.t(c)
z=J.R(a)
y=this.a
x=y.e
w=y.d
y=y.c
v=b
u=null
for(;v<c;++v){switch(z.j(a,v)){case"&":t="&amp;"
break
case'"':t=y?"&quot;":null
break
case"'":t=w?"&#39;":null
break
case"<":t="&lt;"
break
case">":t="&gt;"
break
case"/":t=x?"&#47;":null
break
default:t=null}if(t!=null){if(u==null)u=new P.a1("")
if(v>b){s=z.M(a,b,v)
u.a=u.a+s}u.a=u.a+t
b=v+1}}if(u==null)return
if(c>b)u.a+=z.M(a,b,c)
z=u.a
return z.charCodeAt(0)==0?z:z},
b9:function(a){return new P.lE(this,new P.fD(a))},
$asav:function(){return[P.o,P.o,P.o,P.o]}},lE:{"^":"eM;a,b",
aj:function(a,b,c,d){var z,y
z=this.a.dm(a,b,c)
y=this.b
if(z==null)y.aj(a,b,c,d)
else{y=y.a.a
if((y.e&2)!==0)H.p(new P.x("Stream is already closed"))
y.aq(z)
if(d){if((y.e&2)!==0)H.p(new P.x("Stream is already closed"))
y.aA()}}},
Z:function(a){var z=this.b.a.a
if((z.e&2)!==0)H.p(new P.x("Stream is already closed"))
z.aA()
return}},eM:{"^":"eN;"},eN:{"^":"b;",
p:function(a,b){return this.aj(b,0,b.gk(b),!1)}},fD:{"^":"eM;a",
p:function(a,b){var z=this.a.a
if((z.e&2)!==0)H.p(new P.x("Stream is already closed"))
z.aq(b)
return},
aj:function(a,b,c,d){var z,y
z=b===0&&c===a.length
y=this.a
if(z){z=y.a
if((z.e&2)!==0)H.p(new P.x("Stream is already closed"))
z.aq(a)}else{z=C.a.M(a,b,c)
y=y.a
if((y.e&2)!==0)H.p(new P.x("Stream is already closed"))
y.aq(z)
z=y}if(d){if((z.e&2)!==0)H.p(new P.x("Stream is already closed"))
z.aA()}},
Z:function(a){var z=this.a.a
if((z.e&2)!==0)H.p(new P.x("Stream is already closed"))
z.aA()
return}},m8:{"^":"dN;a,b,c",
Z:function(a){var z,y,x,w
z=this.a
if(z.e>0){H.p(new P.a5("Unfinished UTF-8 octet sequence",null,null))
z.b.a+=H.aQ(65533)
z.d=0
z.e=0
z.f=0}z=this.c
y=z.a
x=this.b
if(y.length!==0){w=y.charCodeAt(0)==0?y:y
z.a=""
x.aj(w,0,w.length,!0)}else x.Z(0)},
p:function(a,b){this.aj(b,0,3,!1)},
aj:function(a,b,c,d){var z,y,x
this.a.aY(a,b,c)
z=this.c
y=z.a
if(y.length!==0){x=y.charCodeAt(0)==0?y:y
this.b.aj(x,0,x.length,!1)
z.a=""
return}}},kV:{"^":"id;a",
gG:function(a){return"utf-8"},
ghG:function(){return C.A}},kX:{"^":"av;",
aY:function(a,b,c){var z,y,x,w
z=a.length
P.bp(b,c,z,null,null,null)
y=z-b
if(y===0)return new Uint8Array(H.df(0))
x=new Uint8Array(H.df(y*3))
w=new P.fG(0,0,x)
if(w.du(a,b,z)!==z)w.bP(J.bS(a,z-1),0)
return C.V.ca(x,0,w.b)},
cJ:function(a){return this.aY(a,0,null)},
b9:function(a){a=new P.lg(a)
return new P.mb(a,0,0,new Uint8Array(H.df(1024)))},
a2:function(a){return this.d9(a)},
$asav:function(){return[P.o,[P.i,P.n],P.o,[P.i,P.n]]}},fG:{"^":"b;a,b,c",
bP:function(a,b){var z,y,x,w,v
z=this.c
y=this.b
if((b&64512)===56320){x=65536+((a&1023)<<10>>>0)|b&1023
w=y+1
this.b=w
v=z.length
if(y>=v)return H.d(z,y)
z[y]=(240|x>>>18)>>>0
y=w+1
this.b=y
if(w>=v)return H.d(z,w)
z[w]=128|x>>>12&63
w=y+1
this.b=w
if(y>=v)return H.d(z,y)
z[y]=128|x>>>6&63
this.b=w+1
if(w>=v)return H.d(z,w)
z[w]=128|x&63
return!0}else{w=y+1
this.b=w
v=z.length
if(y>=v)return H.d(z,y)
z[y]=224|a>>>12
y=w+1
this.b=y
if(w>=v)return H.d(z,w)
z[w]=128|a>>>6&63
this.b=y+1
if(y>=v)return H.d(z,y)
z[y]=128|a&63
return!1}},
du:function(a,b,c){var z,y,x,w,v,u,t,s
if(b!==c&&(J.bS(a,c-1)&64512)===55296)--c
for(z=this.c,y=z.length,x=J.aW(a),w=b;w<c;++w){v=x.q(a,w)
if(v<=127){u=this.b
if(u>=y)break
this.b=u+1
z[u]=v}else if((v&64512)===55296){if(this.b+3>=y)break
t=w+1
if(this.bP(v,C.a.q(a,t)))w=t}else if(v<=2047){u=this.b
s=u+1
if(s>=y)break
this.b=s
if(u>=y)return H.d(z,u)
z[u]=192|v>>>6
this.b=s+1
z[s]=128|v&63}else{u=this.b
if(u+2>=y)break
s=u+1
this.b=s
if(u>=y)return H.d(z,u)
z[u]=224|v>>>12
u=s+1
this.b=u
if(s>=y)return H.d(z,s)
z[s]=128|v>>>6&63
this.b=u+1
if(u>=y)return H.d(z,u)
z[u]=128|v&63}}return w}},mb:{"^":"mc;d,a,b,c",
Z:function(a){var z
if(this.a!==0){this.aj("",0,0,!0)
return}z=this.d.a.a
if((z.e&2)!==0)H.p(new P.x("Stream is already closed"))
z.aA()},
aj:function(a,b,c,d){var z,y,x,w,v,u,t
this.b=0
z=b===c
if(z&&!d)return
if(this.a!==0){y=!z?C.a.q(a,b):0
if(this.bP(this.a,y))++b
this.a=0}z=this.d
x=this.c
w=x.length
v=c-1
u=w-3
do{b=this.du(a,b,c)
t=d&&b===c
if(b===v&&(C.a.q(a,b)&64512)===55296){if(d&&this.b<u)this.bP(C.a.q(a,b),0)
else this.a=C.a.q(a,b);++b}z.p(0,new Uint8Array(x.subarray(0,H.fJ(0,this.b,w))))
if(t)z.Z(0)
this.b=0}while(b<c)
if(d)this.Z(0)}},mc:{"^":"fG+eN;"},kW:{"^":"av;a",
aY:function(a,b,c){var z,y,x,w
z=J.N(a)
P.bp(b,c,z,null,null,null)
y=new P.a1("")
x=new P.fF(!1,y,!0,0,0,0)
x.aY(a,b,z)
if(x.e>0){H.p(new P.a5("Unfinished UTF-8 octet sequence",null,null))
y.a+=H.aQ(65533)
x.d=0
x.e=0
x.f=0}w=y.a
return w.charCodeAt(0)==0?w:w},
cJ:function(a){return this.aY(a,0,null)},
b9:function(a){var z,y
z=new P.fD(a)
y=new P.a1("")
return new P.m8(new P.fF(!1,y,!0,0,0,0),z,y)},
a2:function(a){return this.d9(a)},
$asav:function(){return[[P.i,P.n],P.o,[P.i,P.n],P.o]}},fF:{"^":"b;a,b,c,d,e,f",
Z:function(a){if(this.e>0){H.p(new P.a5("Unfinished UTF-8 octet sequence",null,null))
this.b.a+=H.aQ(65533)
this.d=0
this.e=0
this.f=0}},
aY:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.d
y=this.e
x=this.f
this.d=0
this.e=0
this.f=0
w=new P.ma(c)
v=new P.m9(this,a,b,c)
$loop$0:for(u=J.R(a),t=this.b,s=b;!0;s=n){$multibyte$2:if(y>0){do{if(s===c)break $loop$0
r=u.j(a,s)
if(typeof r!=="number")return r.d2()
if((r&192)!==128)throw H.a(new P.a5("Bad UTF-8 encoding 0x"+C.d.bz(r,16),null,null))
else{z=(z<<6|r&63)>>>0;--y;++s}}while(y>0)
q=x-1
if(q<0||q>=4)return H.d(C.r,q)
if(z<=C.r[q])throw H.a(new P.a5("Overlong encoding of 0x"+C.c.bz(z,16),null,null))
if(z>1114111)throw H.a(new P.a5("Character outside valid Unicode range: 0x"+C.c.bz(z,16),null,null))
if(!this.c||z!==65279)t.a+=H.aQ(z)
this.c=!1}for(q=s<c;q;){p=w.$2(a,s)
if(J.bR(p,0)){this.c=!1
if(typeof p!=="number")return H.t(p)
o=s+p
v.$2(s,o)
if(o===c)break}else o=s
n=o+1
r=u.j(a,o)
m=J.U(r)
if(m.H(r,0))throw H.a(new P.a5("Negative UTF-8 code unit: -0x"+J.hA(m.ay(r),16),null,null))
else{if(typeof r!=="number")return r.d2()
if((r&224)===192){z=r&31
y=1
x=1
continue $loop$0}if((r&240)===224){z=r&15
y=2
x=2
continue $loop$0}if((r&248)===240&&r<245){z=r&7
y=3
x=3
continue $loop$0}throw H.a(new P.a5("Bad UTF-8 encoding 0x"+C.d.bz(r,16),null,null))}}break $loop$0}if(y>0){this.d=z
this.e=y
this.f=x}}},ma:{"^":"f:30;a",
$2:function(a,b){var z,y,x,w
z=this.a
for(y=J.R(a),x=b;x<z;++x){w=y.j(a,x)
if(typeof w!=="number")return w.d2()
if((w&127)!==w)return x-b}return z-b}},m9:{"^":"f:31;a,b,c,d",
$2:function(a,b){this.a.b.a+=P.bJ(this.b,a,b)}}}],["","",,P,{"^":"",
k5:function(a,b,c){var z,y,x,w
if(b<0)throw H.a(P.L(b,0,J.N(a),null,null))
z=c==null
if(!z&&c<b)throw H.a(P.L(c,b,J.N(a),null,null))
y=J.au(a)
for(x=0;x<b;++x)if(!y.m())throw H.a(P.L(b,0,x,null,null))
w=[]
if(z)for(;y.m();)w.push(y.gC())
else for(x=b;x<c;++x){if(!y.m())throw H.a(P.L(c,b,x,null,null))
w.push(y.gC())}return H.eB(w)},
e4:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.C(a)
if(typeof a==="string")return JSON.stringify(a)
return P.ih(a)},
ih:function(a){var z=J.u(a)
if(!!z.$isf)return z.h(a)
return H.bn(a)},
F:function(a){return new P.fs(a)},
j2:function(a,b,c,d){var z,y,x
z=J.iQ(a,d)
if(a!==0&&!0)for(y=z.length,x=0;x<y;++x)z[x]=b
return z},
bm:function(a,b,c){var z,y
z=H.e([],[c])
for(y=J.au(a);y.m();)z.push(y.gC())
if(b)return z
z.fixed$length=Array
return z},
bb:function(a){var z=H.c(a)
H.mY(z)},
bJ:function(a,b,c){var z
if(typeof a==="object"&&a!==null&&a.constructor===Array){z=a.length
c=P.bp(b,c,z,null,null,null)
return H.eB(b>0||c<z?C.b.ca(a,b,c):a)}if(!!J.u(a).$iscP)return H.jo(a,b,P.bp(b,c,a.length,null,null,null))
return P.k5(a,b,c)},
b6:{"^":"b;"},
"+bool":0,
bh:{"^":"b;a,b",
w:function(a,b){if(b==null)return!1
if(!(b instanceof P.bh))return!1
return this.a===b.a&&this.b===b.b},
gV:function(a){var z=this.a
return(z^C.c.aF(z,30))&1073741823},
h:function(a){var z,y,x,w,v,u,t,s
z=this.b
y=P.i_(z?H.a3(this).getUTCFullYear()+0:H.a3(this).getFullYear()+0)
x=P.bA(z?H.a3(this).getUTCMonth()+1:H.a3(this).getMonth()+1)
w=P.bA(z?H.a3(this).getUTCDate()+0:H.a3(this).getDate()+0)
v=P.bA(z?H.a3(this).getUTCHours()+0:H.a3(this).getHours()+0)
u=P.bA(z?H.a3(this).getUTCMinutes()+0:H.a3(this).getMinutes()+0)
t=P.bA(z?H.a3(this).getUTCSeconds()+0:H.a3(this).getSeconds()+0)
s=P.i0(z?H.a3(this).getUTCMilliseconds()+0:H.a3(this).getMilliseconds()+0)
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},
p:function(a,b){return P.hZ(C.c.t(this.a,b.giN()),this.b)},
gi1:function(){return this.a},
eM:function(a,b){var z=this.a
if(!(Math.abs(z)>864e13)){if(Math.abs(z)===864e13);z=!1}else z=!0
if(z)throw H.a(P.aG(this.gi1()))},
n:{
hZ:function(a,b){var z=new P.bh(a,b)
z.eM(a,b)
return z},
i_:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.c(z)
if(z>=10)return y+"00"+H.c(z)
return y+"000"+H.c(z)},
i0:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bA:function(a){if(a>=10)return""+a
return"0"+a}}},
Z:{"^":"ba;"},
"+double":0,
aH:{"^":"b;bd:a<",
t:function(a,b){return new P.aH(this.a+b.gbd())},
X:function(a,b){return new P.aH(this.a-b.gbd())},
D:function(a,b){if(typeof b!=="number")return H.t(b)
return new P.aH(C.d.ae(this.a*b))},
H:function(a,b){return this.a<b.gbd()},
a1:function(a,b){return C.c.a1(this.a,b.gbd())},
bE:function(a,b){return C.c.bE(this.a,b.gbd())},
w:function(a,b){if(b==null)return!1
if(!(b instanceof P.aH))return!1
return this.a===b.a},
gV:function(a){return this.a&0x1FFFFFFF},
h:function(a){var z,y,x,w,v
z=new P.i9()
y=this.a
if(y<0)return"-"+new P.aH(-y).h(0)
x=z.$1(C.c.cW(C.c.bl(y,6e7),60))
w=z.$1(C.c.cW(C.c.bl(y,1e6),60))
v=new P.i8().$1(C.c.cW(y,1e6))
return""+C.c.bl(y,36e8)+":"+H.c(x)+":"+H.c(w)+"."+H.c(v)},
ay:function(a){return new P.aH(-this.a)},
n:{
i7:function(a,b,c,d,e,f){return new P.aH(864e8*a+36e8*b+6e7*e+1e6*f+1000*d+c)}}},
i8:{"^":"f:10;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
i9:{"^":"f:10;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
a0:{"^":"b;",
gao:function(){return H.S(this.$thrownJsError)}},
es:{"^":"a0;",
h:function(a){return"Throw of null."}},
aj:{"^":"a0;a,b,G:c>,d",
gck:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gcj:function(){return""},
h:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.c(z)+")":""
z=this.d
x=z==null?"":": "+H.c(z)
w=this.gck()+y+x
if(!this.a)return w
v=this.gcj()
u=P.e4(this.b)
return w+v+": "+H.c(u)},
n:{
aG:function(a){return new P.aj(!1,null,null,a)},
cv:function(a,b,c){return new P.aj(!0,a,b,c)},
hF:function(a){return new P.aj(!1,null,a,"Must not be null")}}},
c2:{"^":"aj;e,f,a,b,c,d",
gck:function(){return"RangeError"},
gcj:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.c(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.c(z)
else{if(typeof x!=="number")return x.a1()
if(typeof z!=="number")return H.t(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
n:{
bo:function(a,b,c){return new P.c2(null,null,!0,a,b,"Value not in range")},
L:function(a,b,c,d,e){return new P.c2(b,c,!0,a,d,"Invalid value")},
bp:function(a,b,c,d,e,f){if(0>a||a>c)throw H.a(P.L(a,0,c,"start",f))
if(b!=null){if(a>b||b>c)throw H.a(P.L(b,a,c,"end",f))
return b}return c}}},
iv:{"^":"aj;e,k:f>,a,b,c,d",
gck:function(){return"RangeError"},
gcj:function(){if(J.h4(this.b,0))return": index must not be negative"
var z=this.f
if(J.E(z,0))return": no indices are valid"
return": index should be less than "+H.c(z)},
n:{
aL:function(a,b,c,d,e){var z=e!=null?e:J.N(b)
return new P.iv(b,z,!0,a,c,"Index out of range")}}},
w:{"^":"a0;a",
h:function(a){return"Unsupported operation: "+this.a}},
f6:{"^":"a0;a",
h:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.c(z):"UnimplementedError"}},
x:{"^":"a0;a",
h:function(a){return"Bad state: "+this.a}},
W:{"^":"a0;a",
h:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.c(P.e4(z))+"."}},
ji:{"^":"b;",
h:function(a){return"Out of Memory"},
gao:function(){return},
$isa0:1},
eJ:{"^":"b;",
h:function(a){return"Stack Overflow"},
gao:function(){return},
$isa0:1},
hY:{"^":"a0;a",
h:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
fs:{"^":"b;a",
h:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.c(z)}},
a5:{"^":"b;a,b,bv:c>",
h:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=this.a
y=z!=null&&""!==z?"FormatException: "+H.c(z):"FormatException"
x=this.c
w=this.b
if(typeof w!=="string")return x!=null?y+(" (at offset "+H.c(x)+")"):y
if(x!=null)if(!(x<0)){z=J.N(w)
if(typeof z!=="number")return H.t(z)
z=x>z}else z=!0
else z=!1
if(z)x=null
if(x==null){z=J.R(w)
v=z.gk(w)
if(typeof v!=="number")return v.a1()
if(v>78)w=z.M(w,0,75)+"..."
return y+"\n"+H.c(w)}for(z=J.R(w),u=1,t=0,s=null,r=0;r<x;++r){q=z.q(w,r)
if(q===10){if(t!==r||s!==!0)++u
t=r+1
s=!1}else if(q===13){++u
t=r+1
s=!0}}y=u>1?y+(" (at line "+u+", character "+(x-t+1)+")\n"):y+(" (at character "+(x+1)+")\n")
p=z.gk(w)
r=x
while(!0){v=z.gk(w)
if(typeof v!=="number")return H.t(v)
if(!(r<v))break
q=z.q(w,r)
if(q===10||q===13){p=r
break}++r}if(typeof p!=="number")return p.X()
if(p-t>78)if(x-t<75){o=t+75
n=t
m=""
l="..."}else{if(p-x<75){n=p-75
o=p
l=""}else{n=x-36
o=x+36
l="..."}m="..."}else{o=p
n=t
m=""
l=""}k=z.M(w,n,o)
return y+m+k+l+"\n"+C.a.D(" ",x-n+m.length)+"^\n"}},
ik:{"^":"b;G:a>,b",
h:function(a){return"Expando:"+H.c(this.a)},
j:function(a,b){var z,y
z=this.b
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.p(P.cv(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.cT(b,"expando$values")
return y==null?null:H.cT(y,z)},
F:function(a,b,c){var z,y
z=this.b
if(typeof z!=="string")z.set(b,c)
else{y=H.cT(b,"expando$values")
if(y==null){y=new P.b()
H.eA(b,"expando$values",y)}H.eA(y,z,c)}}},
n:{"^":"ba;"},
"+int":0,
P:{"^":"b;",
b0:function(a,b){return H.c1(this,b,H.M(this,"P",0),null)},
bC:["eI",function(a,b){return H.e(new H.d8(this,b),[H.M(this,"P",0)])}],
B:function(a,b){var z
for(z=this.gI(this);z.m();)b.$1(z.gC())},
P:function(a,b){var z,y,x
z=this.gI(this)
if(!z.m())return""
y=new P.a1("")
if(b===""){do y.a+=H.c(z.gC())
while(z.m())}else{y.a=H.c(z.gC())
for(;z.m();){y.a+=b
y.a+=H.c(z.gC())}}x=y.a
return x.charCodeAt(0)==0?x:x},
by:function(a,b){return P.bm(this,!0,H.M(this,"P",0))},
b4:function(a){return this.by(a,!0)},
gk:function(a){var z,y
z=this.gI(this)
for(y=0;z.m();)++y
return y},
gE:function(a){return!this.gI(this).m()},
gO:function(a){var z,y
z=this.gI(this)
if(!z.m())throw H.a(H.al())
do y=z.gC()
while(z.m())
return y},
gaQ:function(a){var z,y
z=this.gI(this)
if(!z.m())throw H.a(H.al())
y=z.gC()
if(z.m())throw H.a(H.iP())
return y},
U:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.a(P.hF("index"))
if(b<0)H.p(P.L(b,0,null,"index",null))
for(z=this.gI(this),y=0;z.m();){x=z.gC()
if(b===y)return x;++y}throw H.a(P.aL(b,this,"index",null,y))},
h:function(a){return P.iN(this,"(",")")}},
c_:{"^":"b;"},
i:{"^":"b;",$asi:null,$isr:1},
"+List":0,
oc:{"^":"b;",
h:function(a){return"null"}},
"+Null":0,
ba:{"^":"b;"},
"+num":0,
b:{"^":";",
w:function(a,b){return this===b},
gV:function(a){return H.aP(this)},
h:function(a){return H.bn(this)},
toString:function(){return this.h(this)}},
j7:{"^":"b;"},
bq:{"^":"b;"},
o:{"^":"b;"},
"+String":0,
a1:{"^":"b;aS:a<",
gk:function(a){return this.a.length},
gE:function(a){return this.a.length===0},
h:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
n:{
cW:function(a,b,c){var z=J.au(b)
if(!z.m())return a
if(c.length===0){do a+=H.c(z.gC())
while(z.m())}else{a+=H.c(z.gC())
for(;z.m();)a=a+c+H.c(z.gC())}return a}}},
f8:{"^":"b;a,b,c,d,e,f,r,x,y,z",
gcP:function(a){var z=this.c
if(z==null)return""
if(J.aW(z).ap(z,"["))return C.a.M(z,1,z.length-1)
return z},
gaM:function(a){var z=this.d
if(z==null)return P.f9(this.a)
return z},
h:function(a){var z,y,x,w
z=this.a
y=""!==z?z+":":""
x=this.c
w=x==null
if(!w||C.a.ap(this.e,"//")||z==="file"){z=y+"//"
y=this.b
if(y.length!==0)z=z+y+"@"
if(!w)z+=H.c(x)
y=this.d
if(y!=null)z=z+":"+H.c(y)}else z=y
z+=this.e
y=this.f
if(y!=null)z=z+"?"+H.c(y)
y=this.r
if(y!=null)z=z+"#"+H.c(y)
return z.charCodeAt(0)==0?z:z},
w:function(a,b){var z,y,x,w
if(b==null)return!1
z=J.u(b)
if(!z.$isf8)return!1
if(this.a===b.a)if(this.c!=null===(b.c!=null))if(this.b===b.b){y=this.gcP(this)
x=z.gcP(b)
if(y==null?x==null:y===x){y=this.gaM(this)
z=z.gaM(b)
if(y==null?z==null:y===z)if(this.e===b.e){z=this.f
y=z==null
x=b.f
w=x==null
if(!y===!w){if(y)z=""
if(z==null?(w?"":x)==null:z===(w?"":x)){z=this.r
y=z==null
x=b.r
w=x==null
if(!y===!w){if(y)z=""
z=z==null?(w?"":x)==null:z===(w?"":x)}else z=!1}else z=!1}else z=!1}else z=!1
else z=!1}else z=!1}else z=!1
else z=!1
else z=!1
return z},
gV:function(a){var z,y,x,w,v
z=new P.kJ()
y=this.gcP(this)
x=this.gaM(this)
w=this.f
if(w==null)w=""
v=this.r
return z.$2(this.a,z.$2(this.b,z.$2(y,z.$2(x,z.$2(this.e,z.$2(w,z.$2(v==null?"":v,1)))))))},
n:{
f9:function(a){if(a==="http")return 80
if(a==="https")return 443
return 0},
kK:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p
z={}
z.a=c
z.b=""
z.c=""
z.d=null
z.e=null
z.a=a.length
z.f=b
z.r=-1
w=b
while(!0){v=z.a
if(typeof v!=="number")return H.t(v)
if(!(w<v)){y=b
x=0
break}u=C.a.q(a,w)
z.r=u
if(u===63||u===35){y=b
x=0
break}if(u===47){x=w===b?2:1
y=b
break}if(u===58){if(w===b)P.b1(a,b,"Invalid empty scheme")
z.b=P.kC(a,b,w);++w
if(w===z.a){z.r=-1
x=0}else{u=C.a.q(a,w)
z.r=u
if(u===63||u===35)x=0
else x=u===47?2:1}y=w
break}++w
z.r=-1}z.f=w
if(x===2){t=w+1
z.f=t
if(t===z.a){z.r=-1
x=0}else{u=C.a.q(a,t)
z.r=u
if(u===47){v=z.f
if(typeof v!=="number")return v.t()
z.f=v+1
new P.kR(z,a,-1).$0()
y=z.f}v=z.r
x=v===63||v===35||v===-1?0:1}}if(x===1)while(!0){v=z.f
if(typeof v!=="number")return v.t()
t=v+1
z.f=t
v=z.a
if(typeof v!=="number")return H.t(v)
if(!(t<v))break
u=C.a.q(a,t)
z.r=u
if(u===63||u===35)break
z.r=-1}v=z.d
s=P.kA(a,y,z.f,null,z.b,v!=null)
v=z.r
if(v===63){v=z.f
if(typeof v!=="number")return v.t()
w=v+1
while(!0){v=z.a
if(typeof v!=="number")return H.t(v)
if(!(w<v)){r=-1
break}if(C.a.q(a,w)===35){r=w
break}++w}v=z.f
if(r<0){if(typeof v!=="number")return v.t()
q=P.fc(a,v+1,z.a,null)
p=null}else{if(typeof v!=="number")return v.t()
q=P.fc(a,v+1,r,null)
p=P.fb(a,r+1,z.a)}}else{if(v===35){v=z.f
if(typeof v!=="number")return v.t()
p=P.fb(a,v+1,z.a)}else p=null
q=null}return new P.f8(z.b,z.c,z.d,z.e,s,q,p,null,null,null)},
b1:function(a,b,c){throw H.a(new P.a5(c,a,b))},
kI:function(){var z=H.jm()
if(z!=null)return P.kK(z,0,null)
throw H.a(new P.w("'Uri.base' is not supported"))},
kB:function(a,b){if(a!=null&&a===P.f9(b))return
return a},
kz:function(a,b,c,d){var z
if(b==null?c==null:b===c)return""
if(C.a.q(a,b)===91){if(typeof c!=="number")return c.X()
z=c-1
if(C.a.q(a,z)!==93)P.b1(a,b,"Missing end `]` to match `[` in host")
if(typeof b!=="number")return b.t()
P.kO(a,b+1,z)
return C.a.M(a,b,c).toLowerCase()}return P.kF(a,b,c)},
kF:function(a,b,c){var z,y,x,w,v,u,t,s,r,q
z=b
y=z
x=null
w=!0
while(!0){if(typeof z!=="number")return z.H()
if(typeof c!=="number")return H.t(c)
if(!(z<c))break
c$0:{v=C.a.q(a,z)
if(v===37){u=P.ff(a,z,!0)
t=u==null
if(t&&w){z+=3
break c$0}if(x==null)x=new P.a1("")
s=C.a.M(a,y,z)
if(!w)s=s.toLowerCase()
x.a=x.a+s
if(t){u=C.a.M(a,z,z+3)
r=3}else if(u==="%"){u="%25"
r=1}else r=3
x.a+=u
z+=r
y=z
w=!0}else{if(v<127){t=v>>>4
if(t>=8)return H.d(C.w,t)
t=(C.w[t]&C.c.aE(1,v&15))!==0}else t=!1
if(t){if(w&&65<=v&&90>=v){if(x==null)x=new P.a1("")
if(typeof y!=="number")return y.H()
if(y<z){t=C.a.M(a,y,z)
x.a=x.a+t
y=z}w=!1}++z}else{if(v<=93){t=v>>>4
if(t>=8)return H.d(C.h,t)
t=(C.h[t]&C.c.aE(1,v&15))!==0}else t=!1
if(t)P.b1(a,z,"Invalid character")
else{if((v&64512)===55296&&z+1<c){q=C.a.q(a,z+1)
if((q&64512)===56320){v=(65536|(v&1023)<<10|q&1023)>>>0
r=2}else r=1}else r=1
if(x==null)x=new P.a1("")
s=C.a.M(a,y,z)
if(!w)s=s.toLowerCase()
x.a=x.a+s
x.a+=P.fa(v)
z+=r
y=z}}}}}if(x==null)return C.a.M(a,b,c)
if(typeof y!=="number")return y.H()
if(y<c){s=C.a.M(a,y,c)
x.a+=!w?s.toLowerCase():s}t=x.a
return t.charCodeAt(0)==0?t:t},
kC:function(a,b,c){var z,y,x,w,v
if(b===c)return""
z=C.a.q(a,b)|32
if(!(97<=z&&z<=122))P.b1(a,b,"Scheme not starting with alphabetic character")
for(y=b,x=!1;y<c;++y){w=C.a.q(a,y)
if(w<128){v=w>>>4
if(v>=8)return H.d(C.u,v)
v=(C.u[v]&C.c.aE(1,w&15))!==0}else v=!1
if(!v)P.b1(a,y,"Illegal scheme character")
if(65<=w&&w<=90)x=!0}a=C.a.M(a,b,c)
return x?a.toLowerCase():a},
kD:function(a,b,c){return P.c7(a,b,c,C.T)},
kA:function(a,b,c,d,e,f){var z,y,x
z=e==="file"
y=z||f
x=P.c7(a,b,c,C.U)
if(x.length===0){if(z)return"/"}else if(y&&!C.a.ap(x,"/"))x="/"+x
return P.kE(x,e,f)},
kE:function(a,b,c){if(b.length===0&&!c&&!C.a.ap(a,"/"))return P.kG(a)
return P.kH(a)},
fc:function(a,b,c,d){return P.c7(a,b,c,C.t)},
fb:function(a,b,c){return P.c7(a,b,c,C.t)},
ff:function(a,b,c){var z,y,x,w,v,u
z=b+2
if(z>=a.length)return"%"
y=C.a.q(a,b+1)
x=C.a.q(a,z)
w=P.fg(y)
v=P.fg(x)
if(w<0||v<0)return"%"
u=w*16+v
if(u<127){z=C.c.aF(u,4)
if(z>=8)return H.d(C.v,z)
z=(C.v[z]&C.c.aE(1,u&15))!==0}else z=!1
if(z)return H.aQ(c&&65<=u&&90>=u?(u|32)>>>0:u)
if(y>=97||x>=97)return C.a.M(a,b,b+3).toUpperCase()
return},
fg:function(a){var z,y
z=a^48
if(z<=9)return z
y=a|32
if(97<=y&&y<=102)return y-87
return-1},
fa:function(a){var z,y,x,w,v,u,t,s
if(a<128){z=new Array(3)
z.fixed$length=Array
z[0]=37
z[1]=C.a.q("0123456789ABCDEF",a>>>4)
z[2]=C.a.q("0123456789ABCDEF",a&15)}else{if(a>2047)if(a>65535){y=240
x=4}else{y=224
x=3}else{y=192
x=2}w=3*x
z=new Array(w)
z.fixed$length=Array
for(v=0;--x,x>=0;y=128){u=C.c.fY(a,6*x)&63|y
if(v>=w)return H.d(z,v)
z[v]=37
t=v+1
s=C.a.q("0123456789ABCDEF",u>>>4)
if(t>=w)return H.d(z,t)
z[t]=s
s=v+2
t=C.a.q("0123456789ABCDEF",u&15)
if(s>=w)return H.d(z,s)
z[s]=t
v+=3}}return P.bJ(z,0,null)},
c7:function(a,b,c,d){var z,y,x,w,v,u,t,s
z=b
y=z
x=null
while(!0){if(typeof z!=="number")return z.H()
if(typeof c!=="number")return H.t(c)
if(!(z<c))break
c$0:{w=C.a.q(a,z)
if(w<127){v=w>>>4
if(v>=8)return H.d(d,v)
v=(d[v]&C.c.aE(1,w&15))!==0}else v=!1
if(v)++z
else{if(w===37){u=P.ff(a,z,!1)
if(u==null){z+=3
break c$0}if("%"===u){u="%25"
t=1}else t=3}else{if(w<=93){v=w>>>4
if(v>=8)return H.d(C.h,v)
v=(C.h[v]&C.c.aE(1,w&15))!==0}else v=!1
if(v){P.b1(a,z,"Invalid character")
u=null
t=null}else{if((w&64512)===55296){v=z+1
if(v<c){s=C.a.q(a,v)
if((s&64512)===56320){w=(65536|(w&1023)<<10|s&1023)>>>0
t=2}else t=1}else t=1}else t=1
u=P.fa(w)}}if(x==null)x=new P.a1("")
v=C.a.M(a,y,z)
x.a=x.a+v
x.a+=H.c(u)
if(typeof t!=="number")return H.t(t)
z+=t
y=z}}}if(x==null)return C.a.M(a,b,c)
if(typeof y!=="number")return y.H()
if(y<c)x.a+=C.a.M(a,y,c)
v=x.a
return v.charCodeAt(0)==0?v:v},
fd:function(a){if(C.a.ap(a,"."))return!0
return C.a.K(a,"/.")!==-1},
kH:function(a){var z,y,x,w,v,u,t
if(!P.fd(a))return a
z=[]
for(y=a.split("/"),x=y.length,w=!1,v=0;v<y.length;y.length===x||(0,H.v)(y),++v){u=y[v]
if(J.E(u,"..")){t=z.length
if(t!==0){if(0>=t)return H.d(z,-1)
z.pop()
if(z.length===0)z.push("")}w=!0}else if("."===u)w=!0
else{z.push(u)
w=!1}}if(w)z.push("")
return C.b.P(z,"/")},
kG:function(a){var z,y,x,w,v,u
if(!P.fd(a))return a
z=[]
for(y=a.split("/"),x=y.length,w=!1,v=0;v<y.length;y.length===x||(0,H.v)(y),++v){u=y[v]
if(".."===u)if(z.length!==0&&!J.E(C.b.gO(z),"..")){if(0>=z.length)return H.d(z,-1)
z.pop()
w=!0}else{z.push("..")
w=!1}else if("."===u)w=!0
else{z.push(u)
w=!1}}y=z.length
if(y!==0)if(y===1){if(0>=y)return H.d(z,0)
y=J.cq(z[0])===!0}else y=!1
else y=!0
if(y)return"./"
if(w||J.E(C.b.gO(z),".."))z.push("")
return C.b.P(z,"/")},
kS:function(a,b){return C.b.hK(a.split("&"),P.cI(),new P.kT(b))},
kL:function(a){var z,y
z=new P.kN()
y=a.split(".")
if(y.length!==4)z.$1("IPv4 address should contain exactly 4 parts")
return H.e(new H.bG(y,new P.kM(z)),[null,null]).b4(0)},
kO:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
if(c==null)c=J.N(a)
z=new P.kP(a)
y=new P.kQ(a,z)
if(J.N(a)<2)z.$1("address is too short")
x=[]
w=b
u=b
t=!1
while(!0){s=c
if(typeof u!=="number")return u.H()
if(typeof s!=="number")return H.t(s)
if(!(u<s))break
if(J.bS(a,u)===58){if(u===b){++u
if(J.bS(a,u)!==58)z.$2("invalid start colon.",u)
w=u}if(u===w){if(t)z.$2("only one wildcard `::` is allowed",u)
J.bc(x,-1)
t=!0}else J.bc(x,y.$2(w,u))
w=u+1}++u}if(J.N(x)===0)z.$1("too few parts")
r=J.E(w,c)
q=J.E(J.dz(x),-1)
if(r&&!q)z.$2("expected a part after last `:`",c)
if(!r)try{J.bc(x,y.$2(w,c))}catch(p){H.D(p)
try{v=P.kL(J.hy(a,w,c))
s=J.as(v,0)
if(typeof s!=="number")return s.c9()
o=J.as(v,1)
if(typeof o!=="number")return H.t(o)
J.bc(x,(s<<8|o)>>>0)
o=J.as(v,2)
if(typeof o!=="number")return o.c9()
s=J.as(v,3)
if(typeof s!=="number")return H.t(s)
J.bc(x,(o<<8|s)>>>0)}catch(p){H.D(p)
z.$2("invalid end of IPv6 address.",w)}}if(t){if(J.N(x)>7)z.$1("an address with a wildcard must have less than 7 parts")}else if(J.N(x)!==8)z.$1("an address without a wildcard must contain exactly 8 parts")
n=H.e(new Array(16),[P.n])
u=0
m=0
while(!0){s=J.N(x)
if(typeof s!=="number")return H.t(s)
if(!(u<s))break
l=J.as(x,u)
if(J.u(l).w(l,-1)){k=9-J.N(x)
for(j=0;j<k;++j){if(m<0||m>=16)return H.d(n,m)
n[m]=0
s=m+1
if(s>=16)return H.d(n,s)
n[s]=0
m+=2}}else{if(typeof l!=="number")return l.eF()
s=C.d.aF(l,8)
if(m<0||m>=16)return H.d(n,m)
n[m]=s
s=m+1
if(s>=16)return H.d(n,s)
n[s]=l&255
m+=2}++u}return n},
d5:function(a,b,c,d){var z,y,x,w,v,u,t
if(c===C.f&&$.$get$fe().b.test(H.aV(b)))return b
z=new P.a1("")
y=c.ghG().cJ(b)
for(x=y.length,w=0,v="";w<x;++w){u=y[w]
if(u<128){t=u>>>4
if(t>=8)return H.d(a,t)
t=(a[t]&C.c.aE(1,u&15))!==0}else t=!1
if(t)v=z.a+=H.aQ(u)
else if(d&&u===32){v+="+"
z.a=v}else{v+="%"
z.a=v
v+="0123456789ABCDEF"[u>>>4&15]
z.a=v
v+="0123456789ABCDEF"[u&15]
z.a=v}}return v.charCodeAt(0)==0?v:v},
ky:function(a,b){var z,y,x
for(z=0,y=0;y<2;++y){x=C.a.q(a,b+y)
if(48<=x&&x<=57)z=z*16+x-48
else{x|=32
if(97<=x&&x<=102)z=z*16+x-87
else throw H.a(P.aG("Invalid URL encoding"))}}return z},
d4:function(a,b,c,d,e){var z,y,x,w,v,u
if(typeof c!=="number")return H.t(c)
z=J.aW(a)
y=b
while(!0){if(!(y<c)){x=!0
break}w=z.q(a,y)
if(w<=127)if(w!==37)v=w===43
else v=!0
else v=!0
if(v){x=!1
break}++y}if(x){if(C.f!==d)v=!1
else v=!0
if(v)return z.M(a,b,c)
else u=new H.dS(z.M(a,b,c))}else{u=[]
for(y=b;y<c;++y){w=z.q(a,y)
if(w>127)throw H.a(P.aG("Illegal percent encoding in URI"))
if(w===37){if(y+3>a.length)throw H.a(P.aG("Truncated URI"))
u.push(P.ky(a,y+1))
y+=2}else if(w===43)u.push(32)
else u.push(w)}}return new P.kW(!1).cJ(u)}}},
kR:{"^":"f:2;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.a
y=z.f
x=z.a
if(y==null?x==null:y===x){z.r=this.c
return}x=this.b
z.r=C.a.q(x,y)
w=this.c
v=-1
u=-1
while(!0){t=z.f
s=z.a
if(typeof t!=="number")return t.H()
if(typeof s!=="number")return H.t(s)
if(!(t<s))break
r=C.a.q(x,t)
z.r=r
if(r===47||r===63||r===35)break
if(r===64){u=z.f
v=-1}else if(r===58)v=z.f
else if(r===91){t=z.f
if(typeof t!=="number")return t.t()
q=C.a.aZ(x,"]",t+1)
if(q===-1){z.f=z.a
z.r=w
v=-1
break}else z.f=q
v=-1}t=z.f
if(typeof t!=="number")return t.t()
z.f=t+1
z.r=w}p=z.f
if(typeof u!=="number")return u.bD()
if(u>=0){z.c=P.kD(x,y,u)
y=u+1}if(typeof v!=="number")return v.bD()
if(v>=0){o=v+1
t=z.f
if(typeof t!=="number")return H.t(t)
if(o<t){n=0
while(!0){t=z.f
if(typeof t!=="number")return H.t(t)
if(!(o<t))break
m=C.a.q(x,o)
if(48>m||57<m)P.b1(x,o,"Invalid port number")
n=n*10+(m-48);++o}}else n=null
z.e=P.kB(n,z.b)
p=v}z.d=P.kz(x,y,p,!0)
t=z.f
s=z.a
if(typeof t!=="number")return t.H()
if(typeof s!=="number")return H.t(s)
if(t<s)z.r=C.a.q(x,t)}},
kJ:{"^":"f:32;",
$2:function(a,b){return b*31+J.V(a)&1073741823}},
kT:{"^":"f:7;a",
$2:function(a,b){var z,y,x,w
z=J.R(b)
y=z.K(b,"=")
if(y===-1){if(!z.w(b,""))J.co(a,P.d4(b,0,z.gk(b),this.a,!0),"")}else if(y!==0){x=z.M(b,0,y)
w=C.a.ba(b,y+1)
z=this.a
J.co(a,P.d4(x,0,x.length,z,!0),P.d4(w,0,w.length,z,!0))}return a}},
kN:{"^":"f:33;",
$1:function(a){throw H.a(new P.a5("Illegal IPv4 address, "+a,null,null))}},
kM:{"^":"f:1;a",
$1:function(a){var z,y
z=H.ez(a,null,null)
y=J.U(z)
if(y.H(z,0)||y.a1(z,255))this.a.$1("each part must be in the range of `0..255`")
return z}},
kP:{"^":"f:34;a",
$2:function(a,b){throw H.a(new P.a5("Illegal IPv6 address, "+a,this.a,b))},
$1:function(a){return this.$2(a,null)}},
kQ:{"^":"f:35;a,b",
$2:function(a,b){var z,y
if(typeof a!=="number")return H.t(a)
if(b-a>4)this.b.$2("an IPv6 part can only contain a maximum of 4 hex digits",a)
z=H.ez(C.a.M(this.a,a,b),16,null)
y=J.U(z)
if(y.H(z,0)||y.a1(z,65535))this.b.$2("each part must be in the range of `0x0..0xFFFF`",a)
return z}}}],["","",,W,{"^":"",
bW:function(a){var z,y
z=document
y=z.createElement("a")
return y},
dP:function(a,b){var z,y
z=document
y=z.createElement("canvas")
return y},
hX:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,C.O)},
ic:function(a,b,c){var z,y
z=document.body
y=(z&&C.l).ak(z,a,b,c)
y.toString
z=new W.ab(y)
z=z.bC(z,new W.mz())
return z.gaQ(z)},
nm:[function(a){return"wheel"},"$1","mF",2,0,39],
bi:function(a){var z,y,x
z="element tag unavailable"
try{y=J.dA(a)
if(typeof y==="string")z=J.dA(a)}catch(x){H.D(x)}return z},
aU:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
fy:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
fK:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.lk(a)
if(!!J.u(z).$isI)return z
return}else return a},
ac:function(a){var z=$.y
if(z===C.e)return a
if(a==null)return
return z.ha(a,!0)},
z:{"^":"a_;","%":"HTMLAppletElement|HTMLBRElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLParagraphElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLShadowElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableColElement|HTMLTitleElement|HTMLUListElement|HTMLUnknownElement;HTMLElement"},
n9:{"^":"z;cQ:hostname=,br:href},aM:port=,c0:protocol=",
h:function(a){return String(a)},
$isk:1,
"%":"HTMLAnchorElement"},
nb:{"^":"z;a_:shape=,cQ:hostname=,br:href},aM:port=,c0:protocol=",
h:function(a){return String(a)},
$isk:1,
"%":"HTMLAreaElement"},
nc:{"^":"z;br:href}","%":"HTMLBaseElement"},
hH:{"^":"k;",
Z:function(a){return a.close()},
"%":";Blob"},
cy:{"^":"z;",$iscy:1,$isI:1,$isk:1,"%":"HTMLBodyElement"},
nd:{"^":"z;G:name=","%":"HTMLButtonElement"},
dO:{"^":"z;",
d4:function(a,b,c){return a.getContext(b,P.mA(c,null))},
er:function(a,b,c,d,e,f,g){var z,y
z=P.b_(["alpha",!0,"depth",!0,"stencil",!1,"antialias",!0,"premultipliedAlpha",!0,"preserveDrawingBuffer",!1])
y=this.d4(a,"webgl",z)
return y==null?this.d4(a,"experimental-webgl",z):y},
eq:function(a,b,c,d,e){return this.er(a,b,c,d,!0,!1,e)},
$isdO:1,
"%":"HTMLCanvasElement"},
nf:{"^":"J;k:length=",$isk:1,"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
nh:{"^":"bB;cH:client=","%":"CrossOriginConnectEvent"},
ni:{"^":"iw;k:length=",
ev:function(a,b){var z=this.fq(a,b)
return z!=null?z:""},
fq:function(a,b){if(W.hX(b) in a)return a.getPropertyValue(b)
else return a.getPropertyValue(P.i5()+b)},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
iw:{"^":"k+hW;"},
hW:{"^":"b;",
gc_:function(a){return this.ev(a,"page")}},
e_:{"^":"z;",$isa_:1,$isJ:1,$isI:1,$isb:1,"%":"HTMLDivElement|PluginPlaceholderElement"},
nj:{"^":"J;",$isk:1,"%":"DocumentFragment|ShadowRoot"},
nk:{"^":"k;G:name=","%":"DOMError|FileError"},
nl:{"^":"k;",
gG:function(a){var z=a.name
if(P.dZ()===!0&&z==="SECURITY_ERR")return"SecurityError"
if(P.dZ()===!0&&z==="SYNTAX_ERR")return"SyntaxError"
return z},
h:function(a){return String(a)},
"%":"DOMException"},
i6:{"^":"k;cE:bottom=,av:height=,b_:left=,cX:right=,b6:top=,ax:width=,u:x=,v:y=",
h:function(a){return"Rectangle ("+H.c(a.left)+", "+H.c(a.top)+") "+H.c(this.gax(a))+" x "+H.c(this.gav(a))},
w:function(a,b){var z,y,x
if(b==null)return!1
z=J.u(b)
if(!z.$isaz)return!1
y=a.left
x=z.gb_(b)
if(y==null?x==null:y===x){y=a.top
x=z.gb6(b)
if(y==null?x==null:y===x){y=this.gax(a)
x=z.gax(b)
if(y==null?x==null:y===x){y=this.gav(a)
z=z.gav(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gV:function(a){var z,y,x,w
z=J.V(a.left)
y=J.V(a.top)
x=J.V(this.gax(a))
w=J.V(this.gav(a))
return W.fy(W.aU(W.aU(W.aU(W.aU(0,z),y),x),w))},
gd0:function(a){return H.e(new P.aa(a.left,a.top),[null])},
$isaz:1,
$asaz:I.ch,
"%":";DOMRectReadOnly"},
lh:{"^":"aM;dB:a<,b",
gE:function(a){return this.a.firstElementChild==null},
gk:function(a){return this.b.length},
j:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.d(z,b)
return z[b]},
F:function(a,b,c){var z=this.b
if(b>>>0!==b||b>=z.length)return H.d(z,b)
this.a.replaceChild(c,z[b])},
sk:function(a,b){throw H.a(new P.w("Cannot resize element lists"))},
p:function(a,b){this.a.appendChild(b)
return b},
gI:function(a){var z=this.b4(this)
return new J.cw(z,z.length,0,null)},
gO:function(a){var z=this.a.lastElementChild
if(z==null)throw H.a(new P.x("No elements"))
return z},
$asaM:function(){return[W.a_]},
$asi:function(){return[W.a_]}},
a_:{"^":"J;im:tagName=",
gcC:function(a){return new W.lo(a)},
gdW:function(a){return new W.lh(a,a.children)},
gcH:function(a){return P.aR(a.clientLeft,a.clientTop,a.clientWidth,a.clientHeight,null)},
gbv:function(a){return P.aR(C.d.ae(a.offsetLeft),C.d.ae(a.offsetTop),C.d.ae(a.offsetWidth),C.d.ae(a.offsetHeight),null)},
h:function(a){return a.localName},
ak:["cb",function(a,b,c,d){var z,y,x,w,v
if(c==null){z=$.e3
if(z==null){z=H.e([],[W.cQ])
y=new W.eq(z)
z.push(W.fw(null))
z.push(W.fE())
$.e3=y
d=y}else d=z
z=$.e2
if(z==null){z=new W.fH(d)
$.e2=z
c=z}else{z.a=d
c=z}}if($.aI==null){z=document.implementation.createHTMLDocument("")
$.aI=z
$.cC=z.createRange()
z=$.aI
z.toString
x=z.createElement("base")
J.bf(x,document.baseURI)
$.aI.head.appendChild(x)}z=$.aI
if(!!this.$iscy)w=z.body
else{y=a.tagName
z.toString
w=z.createElement(y)
$.aI.body.appendChild(w)}if("createContextualFragment" in window.Range.prototype&&!C.b.a0(C.R,a.tagName)){$.cC.selectNodeContents(w)
v=$.cC.createContextualFragment(b)}else{w.innerHTML=b
v=$.aI.createDocumentFragment()
for(;z=w.firstChild,z!=null;)v.appendChild(z)}z=$.aI.body
if(w==null?z!=null:w!==z)J.cu(w)
c.d5(v)
document.adoptNode(v)
return v},function(a,b,c){return this.ak(a,b,c,null)},"hk",null,null,"giM",2,5,null,0,0],
se4:function(a,b){this.c7(a,b)},
c8:function(a,b,c,d){a.textContent=null
a.appendChild(this.ak(a,b,c,d))},
c7:function(a,b){return this.c8(a,b,null,null)},
d3:function(a){return a.getBoundingClientRect()},
$isa_:1,
$isJ:1,
$isI:1,
$isb:1,
$isk:1,
"%":";Element"},
mz:{"^":"f:1;",
$1:function(a){return!!J.u(a).$isa_}},
nn:{"^":"z;G:name=,an:src}","%":"HTMLEmbedElement"},
no:{"^":"bB;bp:error=","%":"ErrorEvent"},
bB:{"^":"k;",
i7:function(a){return a.preventDefault()},
$isb:1,
"%":"AnimationEvent|AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|ClipboardEvent|CloseEvent|CustomEvent|DefaultSessionStartEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|GeofencingEvent|HashChangeEvent|IDBVersionChangeEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PeriodicSyncEvent|PopStateEvent|ProgressEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|ServicePortConnectEvent|ServiceWorkerMessageEvent|SpeechRecognitionEvent|StorageEvent|SyncEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitTransitionEvent|XMLHttpRequestProgressEvent;Event|InputEvent"},
I:{"^":"k;",
f8:function(a,b,c,d){return a.addEventListener(b,H.b9(c,1),!1)},
fN:function(a,b,c,d){return a.removeEventListener(b,H.b9(c,1),!1)},
$isI:1,
$isb:1,
"%":"CrossOriginServiceWorkerClient|MediaStream;EventTarget;e5|e7|e6|e8"},
nH:{"^":"z;G:name=","%":"HTMLFieldSetElement"},
nI:{"^":"hH;G:name=","%":"File"},
nL:{"^":"z;k:length=,G:name=","%":"HTMLFormElement"},
nN:{"^":"iB;",
gk:function(a){return a.length},
j:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.aL(b,a,null,null,null))
return a[b]},
F:function(a,b,c){throw H.a(new P.w("Cannot assign element of immutable List."))},
sk:function(a,b){throw H.a(new P.w("Cannot resize immutable List."))},
gO:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.a(new P.x("No elements"))},
U:function(a,b){if(b<0||b>=a.length)return H.d(a,b)
return a[b]},
$isi:1,
$asi:function(){return[W.J]},
$isr:1,
$isay:1,
$isax:1,
"%":"HTMLCollection|HTMLFormControlsCollection|HTMLOptionsCollection"},
ix:{"^":"k+ae;",$isi:1,
$asi:function(){return[W.J]},
$isr:1},
iB:{"^":"ix+bk;",$isi:1,
$asi:function(){return[W.J]},
$isr:1},
nO:{"^":"z;G:name=,an:src}","%":"HTMLIFrameElement"},
nP:{"^":"z;an:src}","%":"HTMLImageElement"},
nR:{"^":"z;G:name=,an:src}",$isa_:1,$isk:1,$isI:1,"%":"HTMLInputElement"},
cH:{"^":"d_;bR:altKey=,bn:ctrlKey=,bX:location=,bY:metaKey=,bF:shiftKey=",
ge5:function(a){return a.keyCode},
$iscH:1,
$isb:1,
"%":"KeyboardEvent"},
nU:{"^":"z;G:name=","%":"HTMLKeygenElement"},
nV:{"^":"z;br:href}","%":"HTMLLinkElement"},
nW:{"^":"k;",
h:function(a){return String(a)},
"%":"Location"},
nX:{"^":"z;G:name=","%":"HTMLMapElement"},
o_:{"^":"z;bp:error=,an:src}","%":"HTMLAudioElement|HTMLMediaElement|HTMLVideoElement"},
o0:{"^":"z;G:name=","%":"HTMLMetaElement"},
o1:{"^":"ja;",
iB:function(a,b,c){return a.send(b,c)},
c6:function(a,b){return a.send(b)},
"%":"MIDIOutput"},
ja:{"^":"I;G:name=",
Z:function(a){return a.close()},
"%":"MIDIInput;MIDIPort"},
bH:{"^":"d_;bR:altKey=,bn:ctrlKey=,bY:metaKey=,bF:shiftKey=",
gcH:function(a){return H.e(new P.aa(a.clientX,a.clientY),[null])},
gbv:function(a){var z,y,x
if(!!a.offsetX)return H.e(new P.aa(a.offsetX,a.offsetY),[null])
else{z=a.target
if(!J.u(W.fK(z)).$isa_)throw H.a(new P.w("offsetX is only supported on elements"))
y=W.fK(z)
x=H.e(new P.aa(a.clientX,a.clientY),[null]).X(0,J.hn(J.ho(y)))
return H.e(new P.aa(J.dD(x.a),J.dD(x.b)),[null])}},
gc_:function(a){return H.e(new P.aa(a.pageX,a.pageY),[null])},
$isbH:1,
$isb:1,
"%":"PointerEvent;DragEvent|MouseEvent"},
oa:{"^":"k;",$isk:1,"%":"Navigator"},
ob:{"^":"k;G:name=","%":"NavigatorUserMediaError"},
ab:{"^":"aM;a",
gO:function(a){var z=this.a.lastChild
if(z==null)throw H.a(new P.x("No elements"))
return z},
gaQ:function(a){var z,y
z=this.a
y=z.childNodes.length
if(y===0)throw H.a(new P.x("No elements"))
if(y>1)throw H.a(new P.x("More than one element"))
return z.firstChild},
p:function(a,b){this.a.appendChild(b)},
au:function(a,b){var z,y,x,w
z=b.a
y=this.a
if(z!==y)for(x=z.childNodes.length,w=0;w<x;++w)y.appendChild(z.firstChild)
return},
F:function(a,b,c){var z,y
z=this.a
y=z.childNodes
if(b>>>0!==b||b>=y.length)return H.d(y,b)
z.replaceChild(c,y[b])},
gI:function(a){return C.W.gI(this.a.childNodes)},
gk:function(a){return this.a.childNodes.length},
sk:function(a,b){throw H.a(new P.w("Cannot set length on immutable List."))},
j:function(a,b){var z=this.a.childNodes
if(b>>>0!==b||b>=z.length)return H.d(z,b)
return z[b]},
$asaM:function(){return[W.J]},
$asi:function(){return[W.J]}},
J:{"^":"I;",
gi2:function(a){return new W.ab(a)},
ia:function(a){var z=a.parentNode
if(z!=null)z.removeChild(a)},
ii:function(a,b){var z,y
try{z=a.parentNode
J.h7(z,b,a)}catch(y){H.D(y)}return a},
h:function(a){var z=a.nodeValue
return z==null?this.eH(a):z},
fO:function(a,b,c){return a.replaceChild(b,c)},
$isJ:1,
$isI:1,
$isb:1,
"%":"Document|HTMLDocument|XMLDocument;Node"},
jd:{"^":"iC;",
gk:function(a){return a.length},
j:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.aL(b,a,null,null,null))
return a[b]},
F:function(a,b,c){throw H.a(new P.w("Cannot assign element of immutable List."))},
sk:function(a,b){throw H.a(new P.w("Cannot resize immutable List."))},
gO:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.a(new P.x("No elements"))},
U:function(a,b){if(b<0||b>=a.length)return H.d(a,b)
return a[b]},
$isi:1,
$asi:function(){return[W.J]},
$isr:1,
$isay:1,
$isax:1,
"%":"NodeList|RadioNodeList"},
iy:{"^":"k+ae;",$isi:1,
$asi:function(){return[W.J]},
$isr:1},
iC:{"^":"iy+bk;",$isi:1,
$asi:function(){return[W.J]},
$isr:1},
od:{"^":"z;G:name=","%":"HTMLObjectElement"},
oe:{"^":"z;cR:index=","%":"HTMLOptionElement"},
of:{"^":"z;G:name=","%":"HTMLOutputElement"},
og:{"^":"z;G:name=","%":"HTMLParamElement"},
oi:{"^":"k;",
d3:function(a){return a.getBoundingClientRect()},
"%":"Range"},
om:{"^":"z;an:src}","%":"HTMLScriptElement"},
on:{"^":"z;k:length=,G:name=","%":"HTMLSelectElement"},
cV:{"^":"I;",$isI:1,$isb:1,"%":"SourceBuffer"},
oo:{"^":"e7;",
gk:function(a){return a.length},
j:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.aL(b,a,null,null,null))
return a[b]},
F:function(a,b,c){throw H.a(new P.w("Cannot assign element of immutable List."))},
sk:function(a,b){throw H.a(new P.w("Cannot resize immutable List."))},
gO:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.a(new P.x("No elements"))},
U:function(a,b){if(b<0||b>=a.length)return H.d(a,b)
return a[b]},
$isi:1,
$asi:function(){return[W.cV]},
$isr:1,
$isay:1,
$isax:1,
"%":"SourceBufferList"},
e5:{"^":"I+ae;",$isi:1,
$asi:function(){return[W.cV]},
$isr:1},
e7:{"^":"e5+bk;",$isi:1,
$asi:function(){return[W.cV]},
$isr:1},
op:{"^":"z;an:src}","%":"HTMLSourceElement"},
oq:{"^":"bB;bp:error=","%":"SpeechRecognitionError"},
or:{"^":"bB;G:name=","%":"SpeechSynthesisEvent"},
ou:{"^":"z;hh:colSpan}","%":"HTMLTableCellElement|HTMLTableDataCellElement|HTMLTableHeaderCellElement"},
ov:{"^":"z;",
ak:function(a,b,c,d){var z,y
if("createContextualFragment" in window.Range.prototype)return this.cb(a,b,c,d)
z=W.ic("<table>"+b+"</table>",c,d)
y=document.createDocumentFragment()
y.toString
new W.ab(y).au(0,J.hm(z))
return y},
"%":"HTMLTableElement"},
ow:{"^":"z;",
ak:function(a,b,c,d){var z,y,x,w
if("createContextualFragment" in window.Range.prototype)return this.cb(a,b,c,d)
z=document.createDocumentFragment()
y=document
y=J.dt(y.createElement("table"),b,c,d)
y.toString
y=new W.ab(y)
x=y.gaQ(y)
x.toString
y=new W.ab(x)
w=y.gaQ(y)
z.toString
w.toString
new W.ab(z).au(0,new W.ab(w))
return z},
"%":"HTMLTableRowElement"},
ox:{"^":"z;",
ak:function(a,b,c,d){var z,y,x
if("createContextualFragment" in window.Range.prototype)return this.cb(a,b,c,d)
z=document.createDocumentFragment()
y=document
y=J.dt(y.createElement("table"),b,c,d)
y.toString
y=new W.ab(y)
x=y.gaQ(y)
z.toString
x.toString
new W.ab(z).au(0,new W.ab(x))
return z},
"%":"HTMLTableSectionElement"},
eR:{"^":"z;",
c8:function(a,b,c,d){var z
a.textContent=null
z=this.ak(a,b,c,d)
a.content.appendChild(z)},
c7:function(a,b){return this.c8(a,b,null,null)},
$iseR:1,
"%":"HTMLTemplateElement"},
oy:{"^":"z;G:name=","%":"HTMLTextAreaElement"},
cX:{"^":"I;",$isI:1,$isb:1,"%":"TextTrack"},
cY:{"^":"I;",$isI:1,$isb:1,"%":"TextTrackCue|VTTCue"},
oB:{"^":"iD;",
gk:function(a){return a.length},
j:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.aL(b,a,null,null,null))
return a[b]},
F:function(a,b,c){throw H.a(new P.w("Cannot assign element of immutable List."))},
sk:function(a,b){throw H.a(new P.w("Cannot resize immutable List."))},
gO:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.a(new P.x("No elements"))},
U:function(a,b){if(b<0||b>=a.length)return H.d(a,b)
return a[b]},
$isay:1,
$isax:1,
$isi:1,
$asi:function(){return[W.cY]},
$isr:1,
"%":"TextTrackCueList"},
iz:{"^":"k+ae;",$isi:1,
$asi:function(){return[W.cY]},
$isr:1},
iD:{"^":"iz+bk;",$isi:1,
$asi:function(){return[W.cY]},
$isr:1},
oC:{"^":"e8;",
gk:function(a){return a.length},
j:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.aL(b,a,null,null,null))
return a[b]},
F:function(a,b,c){throw H.a(new P.w("Cannot assign element of immutable List."))},
sk:function(a,b){throw H.a(new P.w("Cannot resize immutable List."))},
gO:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.a(new P.x("No elements"))},
U:function(a,b){if(b<0||b>=a.length)return H.d(a,b)
return a[b]},
$isi:1,
$asi:function(){return[W.cX]},
$isr:1,
$isay:1,
$isax:1,
"%":"TextTrackList"},
e6:{"^":"I+ae;",$isi:1,
$asi:function(){return[W.cX]},
$isr:1},
e8:{"^":"e6+bk;",$isi:1,
$asi:function(){return[W.cX]},
$isr:1},
oD:{"^":"d_;bR:altKey=,bn:ctrlKey=,bY:metaKey=,bF:shiftKey=","%":"TouchEvent"},
oE:{"^":"z;an:src}","%":"HTMLTrackElement"},
d_:{"^":"bB;","%":"CompositionEvent|FocusEvent|SVGZoomEvent|TextEvent;UIEvent"},
c8:{"^":"bH;",
ghp:function(a){if(a.deltaY!==undefined)return a.deltaY
throw H.a(new P.w("deltaY is not supported"))},
gho:function(a){if(a.deltaX!==undefined)return a.deltaX
throw H.a(new P.w("deltaX is not supported"))},
$isc8:1,
$isbH:1,
$isb:1,
"%":"WheelEvent"},
l7:{"^":"I;G:name=",
gbX:function(a){return a.location},
dF:function(a,b){return a.requestAnimationFrame(H.b9(b,1))},
dt:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
Z:function(a){return a.close()},
$isk:1,
$isI:1,
"%":"DOMWindow|Window"},
oL:{"^":"J;G:name=","%":"Attr"},
oM:{"^":"k;cE:bottom=,av:height=,b_:left=,cX:right=,b6:top=,ax:width=",
h:function(a){return"Rectangle ("+H.c(a.left)+", "+H.c(a.top)+") "+H.c(a.width)+" x "+H.c(a.height)},
w:function(a,b){var z,y,x
if(b==null)return!1
z=J.u(b)
if(!z.$isaz)return!1
y=a.left
x=z.gb_(b)
if(y==null?x==null:y===x){y=a.top
x=z.gb6(b)
if(y==null?x==null:y===x){y=a.width
x=z.gax(b)
if(y==null?x==null:y===x){y=a.height
z=z.gav(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gV:function(a){var z,y,x,w
z=J.V(a.left)
y=J.V(a.top)
x=J.V(a.width)
w=J.V(a.height)
return W.fy(W.aU(W.aU(W.aU(W.aU(0,z),y),x),w))},
gd0:function(a){return H.e(new P.aa(a.left,a.top),[null])},
$isaz:1,
$asaz:I.ch,
"%":"ClientRect"},
oN:{"^":"J;",$isk:1,"%":"DocumentType"},
oO:{"^":"i6;",
gav:function(a){return a.height},
gax:function(a){return a.width},
gu:function(a){return a.x},
gv:function(a){return a.y},
"%":"DOMRect"},
oR:{"^":"z;",$isI:1,$isk:1,"%":"HTMLFrameSetElement"},
oU:{"^":"iE;",
gk:function(a){return a.length},
j:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.aL(b,a,null,null,null))
return a[b]},
F:function(a,b,c){throw H.a(new P.w("Cannot assign element of immutable List."))},
sk:function(a,b){throw H.a(new P.w("Cannot resize immutable List."))},
gO:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.a(new P.x("No elements"))},
U:function(a,b){if(b<0||b>=a.length)return H.d(a,b)
return a[b]},
$isi:1,
$asi:function(){return[W.J]},
$isr:1,
$isay:1,
$isax:1,
"%":"MozNamedAttrMap|NamedNodeMap"},
iA:{"^":"k+ae;",$isi:1,
$asi:function(){return[W.J]},
$isr:1},
iE:{"^":"iA+bk;",$isi:1,
$asi:function(){return[W.J]},
$isr:1},
ld:{"^":"b;dB:a<",
B:function(a,b){var z,y,x,w,v
for(z=this.gal(),y=z.length,x=this.a,w=0;w<z.length;z.length===y||(0,H.v)(z),++w){v=z[w]
b.$2(v,x.getAttribute(v))}},
gal:function(){var z,y,x,w,v
z=this.a.attributes
y=H.e([],[P.o])
for(x=z.length,w=0;w<x;++w){if(w>=z.length)return H.d(z,w)
v=z[w]
if(v.namespaceURI==null)y.push(J.cs(v))}return y},
gE:function(a){return this.gal().length===0}},
lo:{"^":"ld;a",
j:function(a,b){return this.a.getAttribute(b)},
F:function(a,b,c){this.a.setAttribute(b,c)},
gk:function(a){return this.gal().length}},
bj:{"^":"b;a",
hL:function(a,b){return H.e(new W.fr(a,this.a,!1),[null])},
cO:function(a){return this.hL(a,!1)},
cN:function(a,b){return H.e(new W.fq(a,this.a,!1),[null])},
aJ:function(a){return this.cN(a,!1)}},
fr:{"^":"a6;a,b,c",
a9:function(a,b,c,d){var z=new W.aq(0,this.a,this.b,W.ac(a),!1)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.a6()
return z},
bW:function(a,b,c){return this.a9(a,null,b,c)}},
fq:{"^":"fr;a,b,c"},
aq:{"^":"eL;a,b,c,d,e",
bS:function(){if(this.b==null)return
this.dN()
this.b=null
this.d=null
return},
cU:function(a,b){if(this.b==null)return;++this.a
this.dN()},
ea:function(a){return this.cU(a,null)},
b3:function(){if(this.b==null||this.a<=0)return;--this.a
this.a6()},
a6:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.h5(x,this.c,z,!1)}},
dN:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.h6(x,this.c,z,!1)}}},
li:{"^":"b;a",
cN:function(a,b){return H.e(new W.fq(a,this.fl(a),!1),[null])},
aJ:function(a){return this.cN(a,!1)},
fl:function(a){return this.a.$1(a)}},
db:{"^":"b;em:a<",
aW:function(a){return $.$get$fx().a0(0,W.bi(a))},
aH:function(a,b,c){var z,y,x
z=W.bi(a)
y=$.$get$dc()
x=y.j(0,H.c(z)+"::"+b)
if(x==null)x=y.j(0,"*::"+b)
if(x==null)return!1
return x.$4(a,b,c,this)},
f3:function(a){var z,y
z=$.$get$dc()
if(z.gE(z)){for(y=0;y<262;++y)z.F(0,C.Q[y],W.mG())
for(y=0;y<12;++y)z.F(0,C.k[y],W.mH())}},
$iscQ:1,
n:{
fw:function(a){var z=new W.db(new W.lY(W.bW(null),window.location))
z.f3(a)
return z},
oS:[function(a,b,c,d){return!0},"$4","mG",8,0,9],
oT:[function(a,b,c,d){var z,y,x,w,v
z=d.gem()
y=z.a
x=J.m(y)
x.sbr(y,c)
w=x.gcQ(y)
z=z.b
v=z.hostname
if(w==null?v==null:w===v){w=x.gaM(y)
v=z.port
if(w==null?v==null:w===v){w=x.gc0(y)
z=z.protocol
z=w==null?z==null:w===z}else z=!1}else z=!1
if(!z)if(x.gcQ(y)==="")if(x.gaM(y)==="")z=x.gc0(y)===":"||x.gc0(y)===""
else z=!1
else z=!1
else z=!0
return z},"$4","mH",8,0,9]}},
bk:{"^":"b;",
gI:function(a){return new W.ip(a,this.gk(a),-1,null)},
p:function(a,b){throw H.a(new P.w("Cannot add to immutable List."))},
$isi:1,
$asi:null,
$isr:1},
eq:{"^":"b;a",
p:function(a,b){this.a.push(b)},
aW:function(a){return C.b.dT(this.a,new W.jf(a))},
aH:function(a,b,c){return C.b.dT(this.a,new W.je(a,b,c))}},
jf:{"^":"f:1;a",
$1:function(a){return a.aW(this.a)}},
je:{"^":"f:1;a,b,c",
$1:function(a){return a.aH(this.a,this.b,this.c)}},
lZ:{"^":"b;em:d<",
aW:function(a){return this.a.a0(0,W.bi(a))},
aH:["eL",function(a,b,c){var z,y
z=W.bi(a)
y=this.c
if(y.a0(0,H.c(z)+"::"+b))return this.d.h6(c)
else if(y.a0(0,"*::"+b))return this.d.h6(c)
else{y=this.b
if(y.a0(0,H.c(z)+"::"+b))return!0
else if(y.a0(0,"*::"+b))return!0
else if(y.a0(0,H.c(z)+"::*"))return!0
else if(y.a0(0,"*::*"))return!0}return!1}],
f4:function(a,b,c,d){var z,y,x
this.a.au(0,c)
z=b.bC(0,new W.m_())
y=b.bC(0,new W.m0())
this.b.au(0,z)
x=this.c
x.au(0,C.S)
x.au(0,y)}},
m_:{"^":"f:1;",
$1:function(a){return!C.b.a0(C.k,a)}},
m0:{"^":"f:1;",
$1:function(a){return C.b.a0(C.k,a)}},
m5:{"^":"lZ;e,a,b,c,d",
aH:function(a,b,c){if(this.eL(a,b,c))return!0
if(b==="template"&&c==="")return!0
if(J.dx(a).a.getAttribute("template")==="")return this.e.a0(0,b)
return!1},
n:{
fE:function(){var z,y,x,w
z=H.e(new H.bG(C.x,new W.m6()),[null,null])
y=P.am(null,null,null,P.o)
x=P.am(null,null,null,P.o)
w=P.am(null,null,null,P.o)
w=new W.m5(P.ef(C.x,P.o),y,x,w,null)
w.f4(null,z,["TEMPLATE"],null)
return w}}},
m6:{"^":"f:1;",
$1:function(a){return"TEMPLATE::"+H.c(a)}},
m4:{"^":"b;",
aW:function(a){var z=J.u(a)
if(!!z.$iseE)return!1
z=!!z.$isA
if(z&&W.bi(a)==="foreignObject")return!1
if(z)return!0
return!1},
aH:function(a,b,c){if(b==="is"||C.a.ap(b,"on"))return!1
return this.aW(a)}},
ip:{"^":"b;a,b,c,d",
m:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.as(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gC:function(){return this.d}},
lj:{"^":"b;a",
gbX:function(a){return W.lL(this.a.location)},
Z:function(a){return this.a.close()},
$isI:1,
$isk:1,
n:{
lk:function(a){if(a===window)return a
else return new W.lj(a)}}},
lK:{"^":"b;a",n:{
lL:function(a){if(a===window.location)return a
else return new W.lK(a)}}},
cQ:{"^":"b;"},
lY:{"^":"b;a,b"},
fH:{"^":"b;a",
d5:function(a){new W.md(this).$2(a,null)},
bj:function(a,b){if(b==null)J.cu(a)
else b.removeChild(a)},
fR:function(a,b){var z,y,x,w,v,u,t,s
z=!0
y=null
x=null
try{y=J.dx(a)
x=y.gdB().getAttribute("is")
w=function(c){if(!(c.attributes instanceof NamedNodeMap))return true
var r=c.childNodes
if(c.lastChild&&c.lastChild!==r[r.length-1])return true
if(c.children)if(!(c.children instanceof HTMLCollection||c.children instanceof NodeList))return true
var q=0
if(c.children)q=c.children.length
for(var p=0;p<q;p++){var o=c.children[p]
if(o.id=='attributes'||o.name=='attributes'||o.id=='lastChild'||o.name=='lastChild'||o.id=='children'||o.name=='children')return true}return false}(a)
z=w===!0?!0:!(a.attributes instanceof NamedNodeMap)}catch(t){H.D(t)}v="element unprintable"
try{v=J.C(a)}catch(t){H.D(t)}try{u=W.bi(a)
this.fQ(a,b,z,v,u,y,x)}catch(t){if(H.D(t) instanceof P.aj)throw t
else{this.bj(a,b)
window
s="Removing corrupted element "+H.c(v)
if(typeof console!="undefined")console.warn(s)}}},
fQ:function(a,b,c,d,e,f,g){var z,y,x,w,v
if(c){this.bj(a,b)
window
z="Removing element due to corrupted attributes on <"+d+">"
if(typeof console!="undefined")console.warn(z)
return}if(!this.a.aW(a)){this.bj(a,b)
window
z="Removing disallowed element <"+H.c(e)+"> from "+J.C(b)
if(typeof console!="undefined")console.warn(z)
return}if(g!=null)if(!this.a.aH(a,"is",g)){this.bj(a,b)
window
z="Removing disallowed type extension <"+H.c(e)+' is="'+g+'">'
if(typeof console!="undefined")console.warn(z)
return}z=f.gal()
y=H.e(z.slice(),[H.X(z,0)])
for(x=f.gal().length-1,z=f.a;x>=0;--x){if(x>=y.length)return H.d(y,x)
w=y[x]
if(!this.a.aH(a,J.hz(w),z.getAttribute(w))){window
v="Removing disallowed attribute <"+H.c(e)+" "+w+'="'+H.c(z.getAttribute(w))+'">'
if(typeof console!="undefined")console.warn(v)
z.getAttribute(w)
z.removeAttribute(w)}}if(!!J.u(a).$iseR)this.d5(a.content)}},
md:{"^":"f:36;a",
$2:function(a,b){var z,y,x
z=this.a
switch(a.nodeType){case 1:z.fR(a,b)
break
case 8:case 11:case 3:case 4:break
default:z.bj(a,b)}y=a.lastChild
for(;y!=null;y=x){x=y.previousSibling
this.$2(y,a)}}}}],["","",,P,{"^":""}],["","",,P,{"^":"",n7:{"^":"aZ;",$isk:1,"%":"SVGAElement"},na:{"^":"A;",$isk:1,"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},np:{"^":"A;u:x=,v:y=",$isk:1,"%":"SVGFEBlendElement"},nq:{"^":"A;u:x=,v:y=",$isk:1,"%":"SVGFEColorMatrixElement"},nr:{"^":"A;u:x=,v:y=",$isk:1,"%":"SVGFEComponentTransferElement"},ns:{"^":"A;u:x=,v:y=",$isk:1,"%":"SVGFECompositeElement"},nt:{"^":"A;u:x=,v:y=",$isk:1,"%":"SVGFEConvolveMatrixElement"},nu:{"^":"A;u:x=,v:y=",$isk:1,"%":"SVGFEDiffuseLightingElement"},nv:{"^":"A;u:x=,v:y=",$isk:1,"%":"SVGFEDisplacementMapElement"},nw:{"^":"A;u:x=,v:y=",$isk:1,"%":"SVGFEFloodElement"},nx:{"^":"A;u:x=,v:y=",$isk:1,"%":"SVGFEGaussianBlurElement"},ny:{"^":"A;u:x=,v:y=",$isk:1,"%":"SVGFEImageElement"},nz:{"^":"A;u:x=,v:y=",$isk:1,"%":"SVGFEMergeElement"},nA:{"^":"A;u:x=,v:y=",$isk:1,"%":"SVGFEMorphologyElement"},nB:{"^":"A;u:x=,v:y=",$isk:1,"%":"SVGFEOffsetElement"},nC:{"^":"A;u:x=,v:y=,b8:z=","%":"SVGFEPointLightElement"},nD:{"^":"A;u:x=,v:y=",$isk:1,"%":"SVGFESpecularLightingElement"},nE:{"^":"A;u:x=,v:y=,b8:z=","%":"SVGFESpotLightElement"},nF:{"^":"A;u:x=,v:y=",$isk:1,"%":"SVGFETileElement"},nG:{"^":"A;u:x=,v:y=",$isk:1,"%":"SVGFETurbulenceElement"},nJ:{"^":"A;u:x=,v:y=",$isk:1,"%":"SVGFilterElement"},nK:{"^":"aZ;u:x=,v:y=","%":"SVGForeignObjectElement"},is:{"^":"aZ;","%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},aZ:{"^":"A;",$isk:1,"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},nQ:{"^":"aZ;u:x=,v:y=",$isk:1,"%":"SVGImageElement"},nY:{"^":"A;",$isk:1,"%":"SVGMarkerElement"},nZ:{"^":"A;u:x=,v:y=",$isk:1,"%":"SVGMaskElement"},oh:{"^":"A;u:x=,v:y=",$isk:1,"%":"SVGPatternElement"},oj:{"^":"k;u:x=,v:y=","%":"SVGRect"},ok:{"^":"is;u:x=,v:y=","%":"SVGRectElement"},eE:{"^":"A;",$iseE:1,$isk:1,"%":"SVGScriptElement"},A:{"^":"a_;",
gdW:function(a){return new P.il(a,new W.ab(a))},
se4:function(a,b){this.c7(a,b)},
ak:function(a,b,c,d){var z,y,x,w,v
z=H.e([],[W.cQ])
d=new W.eq(z)
z.push(W.fw(null))
z.push(W.fE())
z.push(new W.m4())
c=new W.fH(d)
y='<svg version="1.1">'+b+"</svg>"
z=document.body
x=(z&&C.l).hk(z,y,c)
w=document.createDocumentFragment()
x.toString
z=new W.ab(x)
v=z.gaQ(z)
for(;z=v.firstChild,z!=null;)w.appendChild(z)
return w},
$isA:1,
$isI:1,
$isk:1,
"%":"SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGMetadataElement|SVGStopElement|SVGStyleElement|SVGTitleElement;SVGElement"},os:{"^":"aZ;u:x=,v:y=",$isk:1,"%":"SVGSVGElement"},ot:{"^":"A;",$isk:1,"%":"SVGSymbolElement"},eS:{"^":"aZ;","%":";SVGTextContentElement"},oz:{"^":"eS;",$isk:1,"%":"SVGTextPathElement"},oA:{"^":"eS;u:x=,v:y=","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement"},oF:{"^":"aZ;u:x=,v:y=",$isk:1,"%":"SVGUseElement"},oG:{"^":"A;",$isk:1,"%":"SVGViewElement"},oQ:{"^":"A;",$isk:1,"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},oV:{"^":"A;",$isk:1,"%":"SVGCursorElement"},oW:{"^":"A;",$isk:1,"%":"SVGFEDropShadowElement"},oX:{"^":"A;",$isk:1,"%":"SVGMPathElement"}}],["","",,P,{"^":""}],["","",,P,{"^":"",n8:{"^":"k;G:name=","%":"WebGLActiveInfo"},ol:{"^":"k;hA:drawingBufferHeight=,hB:drawingBufferWidth=",
h8:function(a,b,c){return a.bindBuffer(b,c)},
h9:function(a,b,c){return a.bindFramebuffer(b,c)},
hd:function(a,b){return a.clear(b)},
he:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
hf:function(a,b){return a.clearDepth(b)},
hg:function(a,b){return a.clearStencil(b)},
hj:function(a){return a.createBuffer()},
hl:function(a){return a.createProgram()},
hm:function(a,b){return a.createShader(b)},
hq:function(a,b){return a.depthFunc(b)},
hy:function(a,b){return a.disableVertexAttribArray(b)},
hz:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
hD:function(a,b){return a.enable(b)},
hF:function(a,b){return a.enableVertexAttribArray(b)},
es:function(a,b){return a.getParameter(b)},
eu:function(a,b,c){return a.getProgramParameter(b,c)},
iu:function(a,b,c){return a.uniform1f(b,c)},
iv:function(a,b,c,d,e){return a.uniform3f(b,c,d,e)},
iw:function(a,b,c,d){return a.uniformMatrix4fv(b,!1,d)},
ix:function(a,b){return a.useProgram(b)},
iy:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,!1,f,g)},
iA:function(a,b,c,d,e){return a.viewport(b,c,d,e)},
"%":"WebGLRenderingContext"}}],["","",,P,{"^":""}],["","",,P,{"^":"",ne:{"^":"b;"}}],["","",,P,{"^":"",
br:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
fz:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
mW:function(a,b){var z
if(a>b)return a
if(a<b)return b
if(typeof b==="number"){if(typeof a==="number")if(a===0)return a+b
if(isNaN(b))return b
return a}if(b===0)z=a===0?1/a<0:a<0
else z=!1
if(z)return b
return a},
aa:{"^":"b;u:a>,v:b>",
h:function(a){return"Point("+H.c(this.a)+", "+H.c(this.b)+")"},
w:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof P.aa))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gV:function(a){var z,y
z=J.V(this.a)
y=J.V(this.b)
return P.fz(P.br(P.br(0,z),y))},
t:function(a,b){var z,y,x,w
z=this.a
y=J.m(b)
x=y.gu(b)
if(typeof z!=="number")return z.t()
if(typeof x!=="number")return H.t(x)
w=this.b
y=y.gv(b)
if(typeof w!=="number")return w.t()
if(typeof y!=="number")return H.t(y)
y=new P.aa(z+x,w+y)
y.$builtinTypeInfo=this.$builtinTypeInfo
return y},
X:function(a,b){var z,y,x,w
z=this.a
y=J.bV(b)
if(typeof z!=="number")return z.X()
if(typeof y!=="number")return H.t(y)
x=this.b
w=b.b
if(typeof x!=="number")return x.X()
if(typeof w!=="number")return H.t(w)
w=new P.aa(z-y,x-w)
w.$builtinTypeInfo=this.$builtinTypeInfo
return w},
D:function(a,b){var z,y
z=this.a
if(typeof z!=="number")return z.D()
if(typeof b!=="number")return H.t(b)
y=this.b
if(typeof y!=="number")return y.D()
y=new P.aa(z*b,y*b)
y.$builtinTypeInfo=this.$builtinTypeInfo
return y}},
lT:{"^":"b;",
gcX:function(a){var z=this.a
if(typeof z!=="number")return z.t()
return z+this.c},
gcE:function(a){var z=this.b
if(typeof z!=="number")return z.t()
return z+this.d},
h:function(a){return"Rectangle ("+H.c(this.a)+", "+H.c(this.b)+") "+this.c+" x "+this.d},
w:function(a,b){var z,y,x,w
if(b==null)return!1
z=J.u(b)
if(!z.$isaz)return!1
y=this.a
x=z.gb_(b)
if(y==null?x==null:y===x){x=this.b
w=z.gb6(b)
if(x==null?w==null:x===w){if(typeof y!=="number")return y.t()
if(y+this.c===z.gcX(b)){if(typeof x!=="number")return x.t()
z=x+this.d===z.gcE(b)}else z=!1}else z=!1}else z=!1
return z},
gV:function(a){var z,y,x,w
z=this.a
y=J.V(z)
x=this.b
w=J.V(x)
if(typeof z!=="number")return z.t()
if(typeof x!=="number")return x.t()
return P.fz(P.br(P.br(P.br(P.br(0,y),w),z+this.c&0x1FFFFFFF),x+this.d&0x1FFFFFFF))},
dY:function(a,b){var z,y
z=J.bV(b)
y=this.a
if(typeof z!=="number")return z.bD()
if(typeof y!=="number")return H.t(y)
if(z>=y){z=b.a
if(typeof z!=="number")return z.bE()
if(z<=y+this.c){z=b.b
y=this.b
if(typeof z!=="number")return z.bD()
if(typeof y!=="number")return H.t(y)
z=z>=y&&z<=y+this.d}else z=!1}else z=!1
return z},
gd0:function(a){var z=new P.aa(this.a,this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
az:{"^":"lT;b_:a>,b6:b>,ax:c>,av:d>",$asaz:null,n:{
aR:function(a,b,c,d,e){var z,y
if(typeof c!=="number")return c.H()
if(c<0)z=-c*0
else z=c
if(typeof d!=="number")return d.H()
if(d<0)y=-d*0
else y=d
return H.e(new P.az(a,b,z,y),[e])}}}}],["","",,H,{"^":"",
df:function(a){return a},
dg:function(a){return a},
fJ:function(a,b,c){var z
if(!(a>>>0!==a))z=b>>>0!==b||a>b||b>c
else z=!0
if(z)throw H.a(H.mC(a,b,c))
return b},
el:{"^":"k;",$isel:1,"%":"ArrayBuffer"},
cO:{"^":"k;",$iscO:1,"%":"DataView;ArrayBufferView;cM|em|eo|cN|en|ep|aN"},
cM:{"^":"cO;",
gk:function(a){return a.length},
$isay:1,
$isax:1},
cN:{"^":"eo;",
j:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.Q(a,b))
return a[b]},
F:function(a,b,c){if(b>>>0!==b||b>=a.length)H.p(H.Q(a,b))
a[b]=c}},
em:{"^":"cM+ae;",$isi:1,
$asi:function(){return[P.Z]},
$isr:1},
eo:{"^":"em+ea;"},
aN:{"^":"ep;",
F:function(a,b,c){if(b>>>0!==b||b>=a.length)H.p(H.Q(a,b))
a[b]=c},
$isi:1,
$asi:function(){return[P.n]},
$isr:1},
en:{"^":"cM+ae;",$isi:1,
$asi:function(){return[P.n]},
$isr:1},
ep:{"^":"en+ea;"},
o2:{"^":"cN;",$isi:1,
$asi:function(){return[P.Z]},
$isr:1,
"%":"Float32Array"},
o3:{"^":"cN;",$isi:1,
$asi:function(){return[P.Z]},
$isr:1,
"%":"Float64Array"},
o4:{"^":"aN;",
j:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.Q(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.n]},
$isr:1,
"%":"Int16Array"},
o5:{"^":"aN;",
j:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.Q(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.n]},
$isr:1,
"%":"Int32Array"},
o6:{"^":"aN;",
j:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.Q(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.n]},
$isr:1,
"%":"Int8Array"},
o7:{"^":"aN;",
j:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.Q(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.n]},
$isr:1,
"%":"Uint16Array"},
o8:{"^":"aN;",
j:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.Q(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.n]},
$isr:1,
"%":"Uint32Array"},
o9:{"^":"aN;",
gk:function(a){return a.length},
j:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.Q(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.n]},
$isr:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
cP:{"^":"aN;",
gk:function(a){return a.length},
j:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.Q(a,b))
return a[b]},
ca:function(a,b,c){return new Uint8Array(a.subarray(b,H.fJ(b,c,a.length)))},
$iscP:1,
$isi:1,
$asi:function(){return[P.n]},
$isr:1,
"%":";Uint8Array"}}],["","",,H,{"^":"",
mY:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{"^":"",
mA:function(a,b){var z={}
a.B(0,new P.mB(z))
return z},
cB:function(){var z=$.dX
if(z==null){z=J.bT(window.navigator.userAgent,"Opera",0)
$.dX=z}return z},
dZ:function(){var z=$.dY
if(z==null){z=P.cB()!==!0&&J.bT(window.navigator.userAgent,"WebKit",0)
$.dY=z}return z},
i5:function(){var z,y
z=$.dU
if(z!=null)return z
y=$.dV
if(y==null){y=J.bT(window.navigator.userAgent,"Firefox",0)
$.dV=y}if(y===!0)z="-moz-"
else{y=$.dW
if(y==null){y=P.cB()!==!0&&J.bT(window.navigator.userAgent,"Trident/",0)
$.dW=y}if(y===!0)z="-ms-"
else z=P.cB()===!0?"-o-":"-webkit-"}$.dU=z
return z},
mB:{"^":"f:37;a",
$2:function(a,b){this.a[a]=b}},
il:{"^":"aM;a,b",
gaD:function(){return H.e(new H.d8(this.b,new P.im()),[null])},
B:function(a,b){C.b.B(P.bm(this.gaD(),!1,W.a_),b)},
F:function(a,b,c){J.hu(this.gaD().U(0,b),c)},
sk:function(a,b){var z,y
z=this.gaD()
y=z.gk(z)
if(b>=y)return
else if(b<0)throw H.a(P.aG("Invalid list length"))
this.ig(0,b,y)},
p:function(a,b){this.b.a.appendChild(b)},
ig:function(a,b,c){var z=this.gaD()
z=H.jM(z,b,H.M(z,"P",0))
C.b.B(P.bm(H.k6(z,c-b,H.M(z,"P",0)),!0,null),new P.io())},
gk:function(a){var z=this.gaD()
return z.gk(z)},
j:function(a,b){return this.gaD().U(0,b)},
gI:function(a){var z=P.bm(this.gaD(),!1,W.a_)
return new J.cw(z,z.length,0,null)},
$asaM:function(){return[W.a_]},
$asi:function(){return[W.a_]}},
im:{"^":"f:1;",
$1:function(a){return!!J.u(a).$isa_}},
io:{"^":"f:1;",
$1:function(a){return J.cu(a)}}}]]
setupProgram(dart,0)
J.u=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.ed.prototype
return J.iS.prototype}if(typeof a=="string")return J.bE.prototype
if(a==null)return J.iT.prototype
if(typeof a=="boolean")return J.iR.prototype
if(a.constructor==Array)return J.bC.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bF.prototype
return a}if(a instanceof P.b)return a
return J.cj(a)}
J.R=function(a){if(typeof a=="string")return J.bE.prototype
if(a==null)return a
if(a.constructor==Array)return J.bC.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bF.prototype
return a}if(a instanceof P.b)return a
return J.cj(a)}
J.ah=function(a){if(a==null)return a
if(a.constructor==Array)return J.bC.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bF.prototype
return a}if(a instanceof P.b)return a
return J.cj(a)}
J.U=function(a){if(typeof a=="number")return J.bD.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.bK.prototype
return a}
J.ci=function(a){if(typeof a=="number")return J.bD.prototype
if(typeof a=="string")return J.bE.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.bK.prototype
return a}
J.aW=function(a){if(typeof a=="string")return J.bE.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.bK.prototype
return a}
J.m=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.bF.prototype
return a}if(a instanceof P.b)return a
return J.cj(a)}
J.j=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.ci(a).t(a,b)}
J.E=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.u(a).w(a,b)}
J.bR=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.U(a).a1(a,b)}
J.dr=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<=b
return J.U(a).bE(a,b)}
J.h4=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.U(a).H(a,b)}
J.h=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.ci(a).D(a,b)}
J.cn=function(a){if(typeof a=="number")return-a
return J.U(a).ay(a)}
J.B=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.U(a).X(a,b)}
J.as=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.fW(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.R(a).j(a,b)}
J.co=function(a,b,c){if(typeof b==="number")if((a.constructor==Array||H.fW(a,a[init.dispatchPropertyName]))&&!a.immutable$list&&b>>>0===b&&b<a.length)return a[b]=c
return J.ah(a).F(a,b,c)}
J.h5=function(a,b,c,d){return J.m(a).f8(a,b,c,d)}
J.h6=function(a,b,c,d){return J.m(a).fN(a,b,c,d)}
J.h7=function(a,b,c){return J.m(a).fO(a,b,c)}
J.bc=function(a,b){return J.ah(a).p(a,b)}
J.by=function(a){return J.ah(a).h1(a)}
J.h8=function(a,b){return J.aW(a).h4(a,b)}
J.bd=function(a,b,c){return J.m(a).h8(a,b,c)}
J.h9=function(a,b,c){return J.m(a).h9(a,b,c)}
J.ha=function(a,b){return J.ah(a).hd(a,b)}
J.hb=function(a,b,c,d,e){return J.m(a).he(a,b,c,d,e)}
J.hc=function(a,b){return J.m(a).hf(a,b)}
J.hd=function(a,b){return J.m(a).hg(a,b)}
J.he=function(a){return J.m(a).Z(a)}
J.bS=function(a,b){return J.aW(a).q(a,b)}
J.bT=function(a,b,c){return J.R(a).dX(a,b,c)}
J.ds=function(a){return J.m(a).hj(a)}
J.dt=function(a,b,c,d){return J.m(a).ak(a,b,c,d)}
J.hf=function(a){return J.m(a).hl(a)}
J.hg=function(a,b){return J.m(a).hm(a,b)}
J.hh=function(a,b){return J.m(a).hq(a,b)}
J.cp=function(a,b){return J.m(a).hy(a,b)}
J.hi=function(a,b,c,d,e){return J.m(a).hz(a,b,c,d,e)}
J.hj=function(a,b){return J.ah(a).U(a,b)}
J.du=function(a,b){return J.m(a).hD(a,b)}
J.dv=function(a,b){return J.m(a).hF(a,b)}
J.dw=function(a,b){return J.ah(a).B(a,b)}
J.dx=function(a){return J.m(a).gcC(a)}
J.dy=function(a){return J.m(a).gcH(a)}
J.hk=function(a){return J.m(a).ghA(a)}
J.hl=function(a){return J.m(a).ghB(a)}
J.at=function(a){return J.m(a).gbp(a)}
J.V=function(a){return J.u(a).gV(a)}
J.a8=function(a){return J.m(a).gcR(a)}
J.cq=function(a){return J.R(a).gE(a)}
J.au=function(a){return J.ah(a).gI(a)}
J.dz=function(a){return J.ah(a).gO(a)}
J.N=function(a){return J.R(a).gk(a)}
J.cr=function(a){return J.m(a).gbX(a)}
J.cs=function(a){return J.m(a).gG(a)}
J.hm=function(a){return J.m(a).gi2(a)}
J.bU=function(a){return J.m(a).ga_(a)}
J.dA=function(a){return J.m(a).gim(a)}
J.hn=function(a){return J.m(a).gd0(a)}
J.bV=function(a){return J.m(a).gu(a)}
J.dB=function(a){return J.m(a).gv(a)}
J.ho=function(a){return J.m(a).d3(a)}
J.hp=function(a,b,c,d,e){return J.m(a).eq(a,b,c,d,e)}
J.hq=function(a,b){return J.m(a).es(a,b)}
J.dC=function(a,b,c){return J.m(a).eu(a,b,c)}
J.l=function(a,b){return J.ah(a).P(a,b)}
J.hr=function(a,b){return J.ah(a).b0(a,b)}
J.ct=function(a){return J.m(a).i7(a)}
J.cu=function(a){return J.ah(a).ia(a)}
J.hs=function(a,b,c){return J.m(a).aN(a,b,c)}
J.ht=function(a,b,c){return J.aW(a).ih(a,b,c)}
J.hu=function(a,b){return J.m(a).ii(a,b)}
J.be=function(a,b){return J.m(a).c6(a,b)}
J.hv=function(a,b){return J.m(a).shh(a,b)}
J.bf=function(a,b){return J.m(a).sbr(a,b)}
J.hw=function(a,b){return J.m(a).se4(a,b)}
J.hx=function(a,b){return J.m(a).san(a,b)}
J.hy=function(a,b,c){return J.aW(a).M(a,b,c)}
J.dD=function(a){return J.U(a).c1(a)}
J.hz=function(a){return J.aW(a).iq(a)}
J.hA=function(a,b){return J.U(a).bz(a,b)}
J.C=function(a){return J.u(a).h(a)}
J.ai=function(a,b){return J.u(a).A(a,b)}
J.dE=function(a,b){return J.U(a).is(a,b)}
J.dF=function(a,b,c){return J.m(a).iu(a,b,c)}
J.dG=function(a,b,c,d,e){return J.m(a).iv(a,b,c,d,e)}
J.hB=function(a,b,c,d){return J.m(a).iw(a,b,c,d)}
J.dH=function(a,b){return J.m(a).ix(a,b)}
J.hC=function(a,b,c,d,e,f,g){return J.m(a).iy(a,b,c,d,e,f,g)}
J.hD=function(a,b,c,d,e){return J.m(a).iA(a,b,c,d,e)}
I.Y=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.l=W.cy.prototype
C.H=J.k.prototype
C.b=J.bC.prototype
C.c=J.ed.prototype
C.d=J.bD.prototype
C.a=J.bE.prototype
C.P=J.bF.prototype
C.V=H.cP.prototype
C.W=W.jd.prototype
C.X=J.jl.prototype
C.Y=J.bK.prototype
C.Z=W.c8.prototype
C.i=W.l7.prototype
C.y=new H.e0()
C.z=new P.ji()
C.A=new P.kX()
C.B=new P.lm()
C.e=new P.lU()
C.m=new P.aH(0)
C.C=new W.bj("keydown")
C.D=new W.bj("keyup")
C.E=new W.bj("mousedown")
C.n=new W.bj("mousemove")
C.o=new W.bj("mouseup")
C.F=new W.bj("scroll")
C.G=new P.iu("element",!0,!1,!1,!1)
C.I=function() {  function typeNameInChrome(o) {    var constructor = o.constructor;    if (constructor) {      var name = constructor.name;      if (name) return name;    }    var s = Object.prototype.toString.call(o);    return s.substring(8, s.length - 1);  }  function getUnknownTag(object, tag) {    if (/^HTML[A-Z].*Element$/.test(tag)) {      var name = Object.prototype.toString.call(object);      if (name == "[object Object]") return null;      return "HTMLElement";    }  }  function getUnknownTagGenericBrowser(object, tag) {    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";    return getUnknownTag(object, tag);  }  function prototypeForTag(tag) {    if (typeof window == "undefined") return null;    if (typeof window[tag] == "undefined") return null;    var constructor = window[tag];    if (typeof constructor != "function") return null;    return constructor.prototype;  }  function discriminator(tag) { return null; }  var isBrowser = typeof navigator == "object";  return {    getTag: typeNameInChrome,    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,    prototypeForTag: prototypeForTag,    discriminator: discriminator };}
C.p=function(hooks) { return hooks; }
C.J=function(hooks) {  if (typeof dartExperimentalFixupGetTag != "function") return hooks;  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);}
C.K=function(hooks) {  var getTag = hooks.getTag;  var prototypeForTag = hooks.prototypeForTag;  function getTagFixed(o) {    var tag = getTag(o);    if (tag == "Document") {      // "Document", so we check for the xmlVersion property, which is the empty      if (!!o.xmlVersion) return "!Document";      return "!HTMLDocument";    }    return tag;  }  function prototypeForTagFixed(tag) {    if (tag == "Document") return null;    return prototypeForTag(tag);  }  hooks.getTag = getTagFixed;  hooks.prototypeForTag = prototypeForTagFixed;}
C.L=function(hooks) {  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";  if (userAgent.indexOf("Firefox") == -1) return hooks;  var getTag = hooks.getTag;  var quickMap = {    "BeforeUnloadEvent": "Event",    "DataTransfer": "Clipboard",    "GeoGeolocation": "Geolocation",    "Location": "!Location",    "WorkerMessageEvent": "MessageEvent",    "XMLDocument": "!Document"};  function getTagFirefox(o) {    var tag = getTag(o);    return quickMap[tag] || tag;  }  hooks.getTag = getTagFirefox;}
C.M=function(hooks) {  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";  if (userAgent.indexOf("Trident/") == -1) return hooks;  var getTag = hooks.getTag;  var quickMap = {    "BeforeUnloadEvent": "Event",    "DataTransfer": "Clipboard",    "HTMLDDElement": "HTMLElement",    "HTMLDTElement": "HTMLElement",    "HTMLPhraseElement": "HTMLElement",    "Position": "Geoposition"  };  function getTagIE(o) {    var tag = getTag(o);    var newTag = quickMap[tag];    if (newTag) return newTag;    if (tag == "Object") {      if (window.DataView && (o instanceof window.DataView)) return "DataView";    }    return tag;  }  function prototypeForTagIE(tag) {    var constructor = window[tag];    if (constructor == null) return null;    return constructor.prototype;  }  hooks.getTag = getTagIE;  hooks.prototypeForTag = prototypeForTagIE;}
C.q=function getTagFallback(o) {  var constructor = o.constructor;  if (typeof constructor == "function") {    var name = constructor.name;    if (typeof name == "string" &&        // constructor name does not 'stick'.  The shortest real DOM object        name.length > 2 &&        // On Firefox we often get "Object" as the constructor name, even for        name !== "Object" &&        name !== "Function.prototype") {      return name;    }  }  var s = Object.prototype.toString.call(o);  return s.substring(8, s.length - 1);}
C.N=function(getTagFallback) {  return function(hooks) {    if (typeof navigator != "object") return hooks;    var ua = navigator.userAgent;    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;    if (ua.indexOf("Chrome") >= 0) {      function confirm(p) {        return typeof window == "object" && window[p] && window[p].name == p;      }      if (confirm("Window") && confirm("HTMLElement")) return hooks;    }    hooks.getTag = getTagFallback;  };}
C.O=function(_, letter) { return letter.toUpperCase(); }
C.r=H.e(I.Y([127,2047,65535,1114111]),[P.n])
C.h=I.Y([0,0,32776,33792,1,10240,0,0])
C.Q=H.e(I.Y(["*::class","*::dir","*::draggable","*::hidden","*::id","*::inert","*::itemprop","*::itemref","*::itemscope","*::lang","*::spellcheck","*::title","*::translate","A::accesskey","A::coords","A::hreflang","A::name","A::shape","A::tabindex","A::target","A::type","AREA::accesskey","AREA::alt","AREA::coords","AREA::nohref","AREA::shape","AREA::tabindex","AREA::target","AUDIO::controls","AUDIO::loop","AUDIO::mediagroup","AUDIO::muted","AUDIO::preload","BDO::dir","BODY::alink","BODY::bgcolor","BODY::link","BODY::text","BODY::vlink","BR::clear","BUTTON::accesskey","BUTTON::disabled","BUTTON::name","BUTTON::tabindex","BUTTON::type","BUTTON::value","CANVAS::height","CANVAS::width","CAPTION::align","COL::align","COL::char","COL::charoff","COL::span","COL::valign","COL::width","COLGROUP::align","COLGROUP::char","COLGROUP::charoff","COLGROUP::span","COLGROUP::valign","COLGROUP::width","COMMAND::checked","COMMAND::command","COMMAND::disabled","COMMAND::label","COMMAND::radiogroup","COMMAND::type","DATA::value","DEL::datetime","DETAILS::open","DIR::compact","DIV::align","DL::compact","FIELDSET::disabled","FONT::color","FONT::face","FONT::size","FORM::accept","FORM::autocomplete","FORM::enctype","FORM::method","FORM::name","FORM::novalidate","FORM::target","FRAME::name","H1::align","H2::align","H3::align","H4::align","H5::align","H6::align","HR::align","HR::noshade","HR::size","HR::width","HTML::version","IFRAME::align","IFRAME::frameborder","IFRAME::height","IFRAME::marginheight","IFRAME::marginwidth","IFRAME::width","IMG::align","IMG::alt","IMG::border","IMG::height","IMG::hspace","IMG::ismap","IMG::name","IMG::usemap","IMG::vspace","IMG::width","INPUT::accept","INPUT::accesskey","INPUT::align","INPUT::alt","INPUT::autocomplete","INPUT::autofocus","INPUT::checked","INPUT::disabled","INPUT::inputmode","INPUT::ismap","INPUT::list","INPUT::max","INPUT::maxlength","INPUT::min","INPUT::multiple","INPUT::name","INPUT::placeholder","INPUT::readonly","INPUT::required","INPUT::size","INPUT::step","INPUT::tabindex","INPUT::type","INPUT::usemap","INPUT::value","INS::datetime","KEYGEN::disabled","KEYGEN::keytype","KEYGEN::name","LABEL::accesskey","LABEL::for","LEGEND::accesskey","LEGEND::align","LI::type","LI::value","LINK::sizes","MAP::name","MENU::compact","MENU::label","MENU::type","METER::high","METER::low","METER::max","METER::min","METER::value","OBJECT::typemustmatch","OL::compact","OL::reversed","OL::start","OL::type","OPTGROUP::disabled","OPTGROUP::label","OPTION::disabled","OPTION::label","OPTION::selected","OPTION::value","OUTPUT::for","OUTPUT::name","P::align","PRE::width","PROGRESS::max","PROGRESS::min","PROGRESS::value","SELECT::autocomplete","SELECT::disabled","SELECT::multiple","SELECT::name","SELECT::required","SELECT::size","SELECT::tabindex","SOURCE::type","TABLE::align","TABLE::bgcolor","TABLE::border","TABLE::cellpadding","TABLE::cellspacing","TABLE::frame","TABLE::rules","TABLE::summary","TABLE::width","TBODY::align","TBODY::char","TBODY::charoff","TBODY::valign","TD::abbr","TD::align","TD::axis","TD::bgcolor","TD::char","TD::charoff","TD::colspan","TD::headers","TD::height","TD::nowrap","TD::rowspan","TD::scope","TD::valign","TD::width","TEXTAREA::accesskey","TEXTAREA::autocomplete","TEXTAREA::cols","TEXTAREA::disabled","TEXTAREA::inputmode","TEXTAREA::name","TEXTAREA::placeholder","TEXTAREA::readonly","TEXTAREA::required","TEXTAREA::rows","TEXTAREA::tabindex","TEXTAREA::wrap","TFOOT::align","TFOOT::char","TFOOT::charoff","TFOOT::valign","TH::abbr","TH::align","TH::axis","TH::bgcolor","TH::char","TH::charoff","TH::colspan","TH::headers","TH::height","TH::nowrap","TH::rowspan","TH::scope","TH::valign","TH::width","THEAD::align","THEAD::char","THEAD::charoff","THEAD::valign","TR::align","TR::bgcolor","TR::char","TR::charoff","TR::valign","TRACK::default","TRACK::kind","TRACK::label","TRACK::srclang","UL::compact","UL::type","VIDEO::controls","VIDEO::height","VIDEO::loop","VIDEO::mediagroup","VIDEO::muted","VIDEO::preload","VIDEO::width"]),[P.o])
C.t=I.Y([0,0,65490,45055,65535,34815,65534,18431])
C.u=I.Y([0,0,26624,1023,65534,2047,65534,2047])
C.R=I.Y(["HEAD","AREA","BASE","BASEFONT","BR","COL","COLGROUP","EMBED","FRAME","FRAMESET","HR","IMAGE","IMG","INPUT","ISINDEX","LINK","META","PARAM","SOURCE","STYLE","TITLE","WBR"])
C.S=I.Y([])
C.T=I.Y([0,0,32722,12287,65534,34815,65534,18431])
C.j=I.Y([0,0,65498,45055,65535,34815,65534,18431])
C.v=I.Y([0,0,24576,1023,65534,34815,65534,18431])
C.w=I.Y([0,0,32754,11263,65534,34815,65534,18431])
C.a0=I.Y([0,0,32722,12287,65535,34815,65534,18431])
C.U=I.Y([0,0,65490,12287,65535,34815,65534,18431])
C.x=H.e(I.Y(["bind","if","ref","repeat","syntax"]),[P.o])
C.k=H.e(I.Y(["A::href","AREA::href","BLOCKQUOTE::cite","BODY::background","COMMAND::icon","DEL::cite","FORM::action","IMG::src","INPUT::src","INS::cite","Q::cite","VIDEO::poster"]),[P.o])
C.f=new P.kV(!1)
C.a_=new W.li(W.mF())
$.q=V.j8()
$.i4="uniform mat4 viewObjMat;                    \nuniform mat4 projMat;                       \n                                            \nattribute vec3 posAttr;                     \n                                            \nvarying float depth;                        \n                                            \nvoid main()                                 \n{                                           \n  vec4 pos = viewObjMat*vec4(posAttr, 1.0); \n  depth = pos.z;                            \n  gl_Position = projMat*pos;                \n}                                           \n"
$.i3="precision mediump float;                                  \n                                                          \nuniform vec3 objClr;                                      \nuniform vec3 fogClr;                                      \nuniform float fogStart;                                   \nuniform float fogStop;                                    \n                                                          \nvarying float depth;                                      \n                                                          \nvoid main()                                               \n{                                                         \n   float factor = (depth-fogStop)/(fogStart-fogStop);     \n   factor = clamp(factor, 0.0, 1.0);                      \n   gl_FragColor = vec4(mix(fogClr, objClr, factor), 1.0); \n}                                                         \n"
$.et=null
$.ex="$cachedFunction"
$.ey="$cachedInvocation"
$.ak=0
$.bg=null
$.dJ=null
$.dl=null
$.fQ=null
$.fZ=null
$.cf=null
$.ck=null
$.dm=null
$.b4=null
$.bu=null
$.bv=null
$.dh=!1
$.y=C.e
$.e9=0
$.aI=null
$.cC=null
$.e3=null
$.e2=null
$.dX=null
$.dW=null
$.dV=null
$.dY=null
$.dU=null
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){$dart_deferred_initializers$[a]($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryUris={}
init.deferredLibraryHashes={};(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["fj","$get$fj",function(){return new Z.a4(0)},"fh","$get$fh",function(){return new Z.a4(65535)},"ag","$get$ag",function(){return new Z.a4(1)},"aC","$get$aC",function(){return new Z.a4(2)},"aB","$get$aB",function(){return new Z.a4(4)},"aD","$get$aD",function(){return new Z.a4(8)},"aE","$get$aE",function(){return new Z.a4(16)},"aS","$get$aS",function(){return new Z.a4(32)},"aT","$get$aT",function(){return new Z.a4(64)},"fi","$get$fi",function(){return new Z.a4(96)},"aF","$get$aF",function(){return new Z.a4(128)},"aA","$get$aA",function(){return new Z.a4(256)},"dT","$get$dT",function(){return init.getIsolateTag("_$dart_dartClosure")},"eb","$get$eb",function(){return H.iL()},"ec","$get$ec",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.e9
$.e9=z+1
z="expando$key$"+z}return new P.ik(null,z)},"eW","$get$eW",function(){return H.ao(H.c6({
toString:function(){return"$receiver$"}}))},"eX","$get$eX",function(){return H.ao(H.c6({$method$:null,
toString:function(){return"$receiver$"}}))},"eY","$get$eY",function(){return H.ao(H.c6(null))},"eZ","$get$eZ",function(){return H.ao(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"f2","$get$f2",function(){return H.ao(H.c6(void 0))},"f3","$get$f3",function(){return H.ao(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"f0","$get$f0",function(){return H.ao(H.f1(null))},"f_","$get$f_",function(){return H.ao(function(){try{null.$method$}catch(z){return z.message}}())},"f5","$get$f5",function(){return H.ao(H.f1(void 0))},"f4","$get$f4",function(){return H.ao(function(){try{(void 0).$method$}catch(z){return z.message}}())},"d9","$get$d9",function(){return P.l8()},"bw","$get$bw",function(){return[]},"fe","$get$fe",function(){return new H.iV("^[\\-\\.0-9A-Z_a-z~]*$",H.iW("^[\\-\\.0-9A-Z_a-z~]*$",!1,!0,!1),null,null)},"fx","$get$fx",function(){return P.ef(["A","ABBR","ACRONYM","ADDRESS","AREA","ARTICLE","ASIDE","AUDIO","B","BDI","BDO","BIG","BLOCKQUOTE","BR","BUTTON","CANVAS","CAPTION","CENTER","CITE","CODE","COL","COLGROUP","COMMAND","DATA","DATALIST","DD","DEL","DETAILS","DFN","DIR","DIV","DL","DT","EM","FIELDSET","FIGCAPTION","FIGURE","FONT","FOOTER","FORM","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","I","IFRAME","IMG","INPUT","INS","KBD","LABEL","LEGEND","LI","MAP","MARK","MENU","METER","NAV","NOBR","OL","OPTGROUP","OPTION","OUTPUT","P","PRE","PROGRESS","Q","S","SAMP","SECTION","SELECT","SMALL","SOURCE","SPAN","STRIKE","STRONG","SUB","SUMMARY","SUP","TABLE","TBODY","TD","TEXTAREA","TFOOT","TH","THEAD","TIME","TR","TRACK","TT","U","UL","VAR","VIDEO","WBR"],null)},"dc","$get$dc",function(){return P.cI()}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,args:[,]},{func:1,v:true},{func:1,v:true,args:[W.bH]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,args:[E.O]},{func:1,args:[F.aJ]},{func:1,args:[,,]},{func:1,v:true,args:[W.cH]},{func:1,ret:P.b6,args:[W.a_,P.o,P.o,W.db]},{func:1,ret:P.o,args:[P.n]},{func:1,ret:P.Z},{func:1,ret:V.ap},{func:1,ret:V.H},{func:1,args:[F.bL,P.Z,P.Z]},{func:1,v:true,args:[W.c8]},{func:1,args:[F.bl]},{func:1,ret:V.c4,args:[P.o]},{func:1,v:true,args:[E.O]},{func:1,args:[P.ba]},{func:1,args:[{func:1,v:true,args:[E.O]}]},{func:1,args:[,P.o]},{func:1,args:[P.o]},{func:1,ret:P.n,args:[Z.a4]},{func:1,v:true,args:[,],opt:[P.bq]},{func:1,args:[,],opt:[,]},{func:1,args:[,P.bq]},{func:1,v:true,args:[,P.bq]},{func:1,v:true,args:[,],opt:[,]},{func:1,args:[P.cE]},{func:1,ret:P.n,args:[,P.n]},{func:1,v:true,args:[P.n,P.n]},{func:1,ret:P.n,args:[,,]},{func:1,v:true,args:[P.o]},{func:1,v:true,args:[P.o],opt:[,]},{func:1,ret:P.n,args:[P.n,P.n]},{func:1,v:true,args:[W.J,W.J]},{func:1,args:[P.o,,]},{func:1,ret:P.b6,args:[P.Z,P.Z]},{func:1,ret:P.o,args:[W.I]},{func:1,args:[{func:1,v:true}]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.n3(d||a)
return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.Y=a.Y
Isolate.ch=a.ch
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.h0(F.h3(),b)},[])
else (function(b){H.h0(F.h3(),b)})([])})})()