webpackJsonp([7],{K2YL:function(e,t){},ZwlK:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("mvHQ"),n=a.n(l),s=a("8bfa"),o=a("AIB4"),i=a("Amqo"),r=a("mtWM"),u=a.n(r),c={data:function(){return{allStudents:[],search:"",SName:"",SId:"",classes:"",totalCount:0,allClasses:[{value:"仁（1）班",label:"仁（1）班"},{value:"仁（2）班",label:"仁（2）班"},{value:"义（1）班",label:"义（1）班"},{value:"义（2）班",label:"义（2）班"},{value:"义（3）班",label:"义（3）班"},{value:"义（4）班",label:"义（4）班"},{value:"礼（1）班",label:"礼（1）班"},{value:"礼（2）班",label:"礼（2）班"},{value:"礼（3）班",label:"礼（3）班"},{value:"礼（4）班",label:"礼（4）班"},{value:"智（1）班",label:"智（1）班"},{value:"智（2）班",label:"智（2）班"},{value:"智（3）班",label:"智（3）班"},{value:"智（4）班",label:"智（4）班"},{value:"信（1）班",label:"信（1）班"},{value:"信（2）班",label:"信（2）班"},{value:"暖星班（送教）",label:"暖星班（送教）"},{value:"入学评估",label:"入学评估"},{value:"毕业班级1",label:"毕业班级1"}],presentStudents:[]}},components:{ElSelectDropdown:i.a,sideBarRouter:s.a,headBarRouter:o.a},methods:{mockTest:function(){var e=this;u.a.get("http://dataformmock.com").then(function(t){console.log(t.data.data.students),e.allStudents=t.data.data.students})},searchByName:function(){var e=this;console.log("查询的姓名："+this.SName),u()({method:"get",url:"http://47.110.134.247/group2_b/scheduleSet/name/student/",params:{name:this.SName}}).then(function(t){e.allStudents=[];for(var a=0;a<t.data.data.length;a++)e.allStudents.push(t.data.data[a]);e.totalCount=e.allStudents.length,e.initPagination(),e.SId=e.classes=""})},searchById:function(){var e=this;console.log(this.SId),u()({method:"get",url:"http://47.110.134.247/group2_b/scheduleSet/studentId/student/",params:{studentId:this.SId}}).then(function(t){e.allStudents=[],e.allStudents.push(t.data.data),e.totalCount=e.allStudents.length,e.initPagination(),e.SName=e.classes=""})},searchByClass:function(){var e=this;console.log("查询的班级："+this.classes),u()({method:"get",url:"http://47.110.134.247/group2_b/scheduleSet/classId/student/",params:{classId:this.classes,pageNumber:0,pageSize:10}}).then(function(t){console.log(t.data.data),console.log(t.data.data.students),e.allStudents=t.data.data.students,e.totalCount=t.data.data.totalCount,e.initPagination(),e.SId=e.SName=""})},initPagination:function(){this.totalCount<10?this.presentStudents=this.allStudents.slice(0,this.totalCount):this.presentStudents=this.allStudents.slice(0,10)},handleCurrentChange:function(e){console.log("当前页: "+e);var t=10*(e-1),a=10*e;console.log("begin is: "+t+" ;end is: "+a),this.presentStudents=this.allStudents.slice(t,a),console.log(this.presentStudents)},viewTables:function(e,t){console.log("跳转之前"),console.log(e,t),this.$router.push({path:"/show_school_tables",name:"show_school_tables",query:{row:t}})},handleEdit:function(e,t){console.log("跳转之前"),console.log(e,t),this.$router.push({path:"/show_list",name:"show_list",query:{row:t}})},createNew:function(e,t){console.log("跳转之前"),console.log(e,t),this.$router.push({path:"/creat_school_tables",name:"creat_school_tables",query:{row:t}})},handleDelete:function(e,t){console.log(e,t)},mySession:function(){var e={id:"Session里的id",name:"Session里的name"};window.sessionStorage.searchIndex=n()(e),this.$router.push({path:"/test_dir",name:"test_dir"})}}},d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-container",{staticStyle:{position:"absolute",top:"0",bottom:"0",left:"0",width:"100%"},attrs:{direction:"vertical"}},[a("el-header",{staticStyle:{height:"82px",background:"#f1f2f7"}},[a("head-bar-router")],1),e._v(" "),a("el-container",[a("el-aside",{staticStyle:{width:"211px"}},[a("side-bar-router")],1),e._v(" "),a("el-main",{staticClass:"el-main"},[a("el-container",[a("el-main",[a("el-header",[e._v("学生课表")]),e._v(" "),a("el-container",[a("div",{attrs:{id:"searchModal"}},[a("el-form",{attrs:{inline:!0}},[a("el-form-item",{attrs:{label:"按姓名查询"},nativeOn:{submit:function(e){e.preventDefault()}}},[a("el-input",{attrs:{placeholder:"请输入学生姓名",clearable:""},model:{value:e.SName,callback:function(t){e.SName=t},expression:"SName"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){return e.searchByName()}}},[e._v("查询")])],1),e._v(" "),a("el-form-item",[a("el-form",{attrs:{inline:!0}},[a("el-form-item",{attrs:{label:"按学号查询"}},[a("el-input",{attrs:{placeholder:"请输入学生学号",clearable:""},model:{value:e.SId,callback:function(t){e.SId=t},expression:"SId"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){return e.searchById()}}},[e._v("查询")])],1)],1)],1)],1),e._v(" "),a("el-form",{attrs:{inline:!0}},[a("el-form-item",{attrs:{label:"按班级查询"}},[a("el-select",{attrs:{placeholder:"班级名称"},model:{value:e.classes,callback:function(t){e.classes=t},expression:"classes"}},e._l(e.allClasses,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){return e.searchByClass()}}},[e._v("查询")])],1)],1)],1)]),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.presentStudents,border:""}},[a("el-table-column",{attrs:{prop:"studentId",label:"学号",width:"180"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"姓名",width:"180"}}),e._v(" "),a("el-table-column",{attrs:{prop:"classId",label:"班级"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"info",icon:"el-icon-s-promotion"},on:{click:function(a){return e.viewTables(t.$index,t.row)}}},[e._v("查看\n                  ")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"success",icon:"el-icon-plus"},on:{click:function(a){return e.createNew(t.$index,t.row)}}},[e._v("新建\n                  ")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"primary",icon:"el-icon-edit"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("修改\n                  ")])]}}])})],1),e._v(" "),a("div",{staticClass:"block",attrs:{id:"pagination"}},[a("el-pagination",{attrs:{layout:"prev, pager, next",total:e.totalCount},on:{"current-change":e.handleCurrentChange}})],1)],1)],1)],1)],1)],1)],1)},staticRenderFns:[]};var h=a("VU/8")(c,d,!1,function(e){a("K2YL")},null,null);t.default=h.exports}});
//# sourceMappingURL=7.3ddd1355cacf5d1ddfcb.js.map