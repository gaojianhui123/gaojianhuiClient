import { Component, OnInit } from '@angular/core';
import { ModalHelper } from '@delon/theme';
import {LienPersonnelService} from '../../../services/LienPersonnelService';
import { RoomService } from '../../../services/RoomService';
import { QueryParam } from '../../../model/page/QueryParam';
import { Room } from '../../../model/Room';
import { BedService } from '../../../services/BedService';
import { Bed } from '../../../model/Bed';
import { NzMessageService } from 'ng-zorro-antd';


@Component({
  selector: 'app-floorplan-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.scss'],
})
export class FloorplanListComponent implements OnInit {
  roomList: Array<Room> = new Array<Room>(); // 房间列表
  roomOutList: Array<Room> = new Array<Room>(); // 房间外面展示的数据的列表
  bedList: Array<Bed> = new Array<Bed>(); // 床位列表
  room: Room = new Room(); // 房间对象
  selectValue: string;
  showTwoFloor = true; // 默认隐藏2楼的图
  showOneFloor = true; // 默认隐藏1楼的图
  showView = false; // 是否显示详情模态框的一个标识默认为false（不显示）

  personTotal:string;
  menCount:string;
  womenCount:string;
  wujingTypeCount:string;
  menGongAnTypeCount:string;
  womenGongAnTypeCount:string;
  constructor(private modal: ModalHelper, private roomService: RoomService,
              private bedService: BedService, private messageService: NzMessageService, private lienPersonnelService: LienPersonnelService) {
  }

  ngOnInit() {
  }
  // 拿到 房间号
  getRoomName(key: string) {
    if (this.roomList.length > 0) {
      const rList = this.roomList.filter( (r) => {
        return r.fixationValue === key;
      });
      if (rList && rList.length > 0) {
        return rList[0].title;
      } else {
        return '';
      }
    }
  }


获取每层留置人员
  getCount(floor:string){
    this.lienPersonnelService.getCountLienPersonByFloor(floor).subscribe((res) => {
      this.personTotal=res.content[0].count;
      this.menCount=res.content[1].count;
      this.womenCount=res.content[2].count;
      this.wujingTypeCount=res.content[3].count;
      this.womenGongAnTypeCount=res.content[4].count;
      this.menGongAnTypeCount=res.content[5].count;
    });
  }
  // 拿到 留置人代号_房间A
  getLienDaiHao_1(key: string) {
    if (this.roomOutList.length > 0) {
      const rList = this.roomOutList.filter( (r) => {
        return r.fixationValue === key;
      });
      //房间中一人
      if (rList && rList.length==1) {
        if(rList[0].bedName.indexOf("A")>=0){
         return rList[0].daiHao;
          }else {
         return '暂无人员';
       }
      }else if (rList && rList.length==2){
        if(rList[0].bedName.indexOf("A")>=0){
          return rList[0].daiHao;
        }else {
          return rList[1].daiHao;
        }
      } else {
        return '暂无人员';
      }
    } else {
      return '暂无人员';
    }
  }
  // 拿到 留置人代号
  getLienDaiHao_2(key: string) {
    if (this.roomOutList.length > 0) {
      const rList = this.roomOutList.filter( (r) => {
        return r.fixationValue === key;
      });
      //房间中一人
      if (rList && rList.length==1) {

        if(rList[0].bedName.indexOf("B")>=0){
          return rList[0].daiHao;
        }else {
          return '暂无人员';
        }
      }else if (rList && rList.length==2){
        if(rList[0].bedName.indexOf("B")>=0){
          return rList[0].daiHao;
        }else {
          return rList[1].daiHao;
        }
      } else {
        return '暂无人员';
      }
    } else {
      return '暂无人员';
    }
  }
  // 查看详细信息-- 模态框
  showDetail (key: string) {
    this.room = new Room();
    this.bedList  = new Array<Bed>();
    // 根据选中的房间弹出来这个房间的详情信息
    const bedQuery = new QueryParam<Bed>();
    bedQuery.paging = false;
    bedQuery.query.key = key;
    this.roomService.getRoomByFixationValue(key).subscribe( res => {
      this.room = res;
    });
    this.bedService.findBedByMybatis(bedQuery).subscribe( res => {
      this.bedList = res.content;
    });
    this.showView = true;
  }
  // 保存
  saveRoomAndBed () {
    this.room.bedList = this.bedList;
    this.roomService.saveRoom(this.room).subscribe( res => {
      this.roomList.map(  r => {
        if (r.fixationValue === this.room.fixationValue) {
          r.title = this.room.title;
        }
        return r;
      });
    });
    this.showView = false;
  }
  // 取消保存
  cancel () {
    this.showView = false;
  }

  // 查询按钮
  querySelect() {
    this.roomList = new Array<Room>();
    switch (this.selectValue) {
      case '1':
        this.showOneFloor = false;
        this.showTwoFloor = true;
        // 查询所有一楼的数据
        const roomOneQuery = new QueryParam<Room>();
        roomOneQuery.paging = false;
        roomOneQuery.query.floorTier = '1';
        this.roomService.findRoom(roomOneQuery).subscribe( res => {
          this.roomList = res.content;
        });
        this.getCount("1");
        this.roomService.findRoomByMybatis(roomOneQuery).subscribe( res => {
          this.roomOutList = res.content;
          console.log(this.roomOutList);
        });
        break;
      case '2':
        this.showTwoFloor = false;
        this.showOneFloor = true;
        // 查询所有二楼的数据
        const roomTwoQuery = new QueryParam<Room>();
        roomTwoQuery.paging = false;
        roomTwoQuery.query.floorTier = '2';
        this.getCount("2");
        this.roomService.findRoom(roomTwoQuery).subscribe( res => {
          this.roomList = res.content;
        });
        this.roomService.findRoomByMybatis(roomTwoQuery).subscribe( res => {
          this.roomOutList = res.content;
        });
        break;
    }
  }
  // 导出表格
  export() {
    if (this.selectValue) {
      this.roomService.exportRoom(this.selectValue);
    } else {
      this.messageService.error('请选择要导出的楼层！');
    }
  }
}
