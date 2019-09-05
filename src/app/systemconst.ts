export const systemconst = {
    // api_url: 'https://112.35.26.204:9999/',
    // 该项目的外网是：http://47.93.29.226:8898/#/login
    // fileServer_url : 'http://localhost:8080/',
    // api_url: 'http://localhost:8080/',
    // fileUpload_url: 'http://localhost:8080/file/upload',
    // token_id: 'dangjianyuntoken',
  /**
   * 兼容ng-ZORRO和fontawesome两个icon
   */
  // {label: '', value: 'anticon-'}, {label: '', value: 'fa-'},
    icons: [
      {label: 'home', value: 'anticon-home'}, {label: 'apple', value: 'anticon-apple'},
      {label: 'android', value: 'anticon-android'}, {label: 'user', value: 'fa-user'},
      {label: 'ticket', value: 'fa-ticket'}, {label: 'file-archive-o', value: 'fa-file-archive-o'},
      {label: 'file-text', value: 'fa-file-text'}, {label: 'file-image-o ', value: 'fa-file-image-o'},
      {label: 'chrome', value: 'anticon-chrome'}, {label: 'diamond ', value: 'fa-diamond '},
      {label: 'wechat', value: 'anticon-wechat'}, {label: 'lock', value: 'anticon-lock'},
      {label: 'unlock', value: 'anticon-unlock'}, {label: 'file-video-o', value: 'fa-file-video-o'},
      {label: 'superpowers', value: 'fa-superpowers'}, {label: 'address-card-o', value: 'fa-address-card-o'},
      {label: 'window-close', value: 'fa-window-close'}, {label: 'wpexplorer', value: 'fa-wpexplorer'},
      {label: 'grav', value: 'fa-grav'}, {label: 'bandcamp', value: 'fa-bandcamp'},
      {label: 'envelope-open', value: 'fa-envelope-open'}, {label: 'imdb', value: 'fa-imdb'},
      {label: 'balance-scale', value: 'fa-balance-scale'}, {label: 'check-circle', value: 'fa-check-circle'},
    ],

  /**
   * 下拉多选 认领岗位
   */
  listOfOption: [
      {label: '“微心愿”爱心服务', value: '“微心愿”爱心服务'}, {label: '行业特点定制专岗', value: '行业特点定制专岗'}, {label: '互助帮扶送学上门', value: '互助帮扶送学上门'},
      {label: '互助帮扶送学上门/协调和睦邻里关系', value: '互助帮扶送学上门/协调和睦邻里关系'}, {label: '平安和谐志愿巡逻', value: '平安和谐志愿巡逻'}, {label: '平安和谐志愿巡逻', value: '平安和谐志愿巡逻'},
      {label: '社区环境美化清扫', value: '社区环境美化清扫'}, {label: '协调和睦邻里关系', value: '协调和睦邻里关系'}, {label: '育幼助老五爱教育', value: '育幼助老五爱教育'},
      {label: '兴趣特长服务专岗', value: '兴趣特长服务专岗'}, {label: '兴趣特长服务专岗/协调和睦邻里关系', value: '兴趣特长服务专岗/协调和睦邻里关系'},
],
// 婚姻状况
  HunYinZhangKuangs: [
    {label: '未婚', value: '未婚'}, {label: '已婚', value: '已婚'}, {label: '离婚', value: '离婚'},
    {label: '复婚', value: '复婚'}, {label: '离异', value: '离异'}, {label: '丧偶', value: '丧偶'},
    {label: '再婚', value: '再婚'}, {label: '其他', value: '其他'}
  ],
  // 文化程度
   WenHuaChengDus: [
     {label: '学龄前', value: '学龄前'}, {label: '小学', value: '小学'}, {label: '初中', value: '初中'}, {label: '中学', value: '中学'},
     {label: '中专', value: '中专'}, {label: '高中', value: '高中'}, {label: '中等专业学校', value: '中等专业学校'}, {label: '技工学校', value: '技工学校'},
     {label: '大专', value: '大专'}, {label: '大学专科和专科学校', value: '大学专科和专科学校'}, {label: '大学', value: '大学'}, {label: '大学本科', value: '大学本科'},
     {label: '研究生', value: '研究生'}, {label: '硕士研究生', value: '硕士研究生'}, {label: '博士研究生', value: '博士研究生'}, {label: '文盲或半文盲', value: '文盲或半文盲'},
     {label: '其他', value: '其他'}
   ],
// 政治面貌
  ZhengZhiMianMaos: [
    {label: '党员', value: '党员'}, {label: '民主党派致公党', value: '民主党派致公党'}, {label: '团员', value: '团员'}, {label: '少先队', value: '少先队'},
    {label: '群众', value: '群众'}, {label: '其他', value: '其他'}
  ],
// 户口类型
  HuKouLeiXings: [
    {label: '户在人不在', value: '户在人不在'}, {label: '人在户在', value: '人在户在'}, {label: '人在户不在', value: '人在户不在'},
     {label: '其他', value: '其他'}
  ],
// 与户主关系
  YuHuZhuGuanXis: [
    {label: '户主', value: '户主'}, {label: '父亲', value: '父亲'}, {label: '儿子', value: '儿子'}, {label: '儿媳', value: '儿媳'},
    {label: '母亲', value: '母亲'}, {label: '女儿', value: '女儿'}, {label: '女婿', value: '女婿'}, {label: '非亲属', value: '非亲属'},
    {label: '丈夫', value: '丈夫'}, {label: '妻子', value: '妻子'}, {label: '兄弟姐妹', value: '兄弟姐妹'},
    {label: '叔父', value: '叔父'},{label: '侄女', value: '侄女'}, {label: '侄子', value: '侄子'}, {label: '外甥', value: '外甥'},
    {label: '孙女', value: '孙女'}, {label: '孙子', value: '孙子'}, {label: '外孙女', value: '外孙女'}, {label: '外孙子', value: '外孙子'},
    {label: '其他', value: '其他'},
  ],
// 与党员类型
  DangYuanLeiXings: [
    {label: '在职党员', value: '在职党员'}, {label: '预备党员', value: '预备党员'}, {label: '党员领导干部', value: '党员领导干部'}, {label: '机关党员', value: '机关党员'},
    {label: '其他', value: '其他'},
  ],

};

