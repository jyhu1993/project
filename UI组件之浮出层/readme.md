浮出层
===
基本功能
----
>>1，点击相应按钮弹出窗口，浮出层始终保持在浏览器窗口正中，定位方法position:fixed;<br>
>>2，浮出层可在窗口实现拖拽，运用html5中的拖拽API：<br>
>>>>(1)将拖放元素的draggable属性设为true;<br>
>>>>(2)拖放元素监听‘dragstart'事件，通过dataTransfer对象传递数据，需注意event.dataTransfer.setData（‘第一个参数’，‘第二个参数’） 方法只能在‘dragstart’事件中运用，且第一个参数为‘text/plain','text/html','text/xml','text/uri-list'等MIME类型；第二个参数为字符串，若需 传递数组，对象等通过JSON.stringify()方法转化；<br>
>>>>(3)拖放结束时，拖放的目标元素（即要将拖放元素拖放到哪里的那个元素）监听’drop‘事件，此时可运用event.dataTransfer.getData('第一个参数')方法 将需要传递的数据取出，需注意，getData()方法只能在drop事件中运用，且其参数只有一个，即setData()方法中的第一个参数；<br>
>>>>(4)要实现拖拽过程，还必须设定整个页面不执行默认行为，即拒绝被拖放的行为，否则拖放无法实现，’dragover‘事件监听整个拖放过程，代码如下:<br>document.ondragover = function(ev){ev.preventDefault();};<br>

>>3,实现拖拽浮出层右边框，下边框缩放浮出层的目标；<br>
>>>>(1)首先对边框监听’mousedown‘事件，由于在此之前已绑定拖放事件，因此点击边框时需阻止拖放事件{event.preventDefault()};<br>
>>>>(2)在整个文档上监听’mousemove‘事件，并通过event.clientY方法获取光标相对于浏览器窗口的距离（event.offsetY是光标相对于事件绑定元素 左上角的距离）；<br>
>>>>(3)在整个文档上监听’mouseup'事件，若触发该事件则移出文档上绑定的‘mousemove'事件；
