import { LienPersonnelService } from '../../services/LienPersonnelService';
import { StatisticTanHuaDto } from '../../model/dto/StatisticTanHuaDto';
import { NurseService } from '../../services/NurseService';
import { LienPersonnel } from '../../model/LienPersonnel';
import { QueryParam } from '../../model/page/QueryParam';
import { SanyiPage } from '../../model/page/SanyiPage';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-statistictanhua',
  templateUrl: './statistictanhua.component.html',
  styleUrls: ['./statistictanhua.component.css'],
})
export class StatistictanhuaComponent implements OnInit {
  isLoading = false;
  option: {}; // 谈话次数统计图的配置
  optionDuration: {}; // 谈话时长统计图的配置
  sDto: StatisticTanHuaDto = new StatisticTanHuaDto(); // 谈话数据
  statisticTanHuaDtos: Array<StatisticTanHuaDto> = new Array<StatisticTanHuaDto>(); // 谈话数据列表
  optionLP: Array<LienPersonnel> = new Array<LienPersonnel>(); // 遍历留置人代号
  // 留置人id
  lId: any;
  // 上报时间
  submitTime: any;
  ciShuTotal = 0; // 次数汇总
  shiChangTotal = 0; // 时长汇总

  constructor(private router: Router, private nurseService: NurseService, private lienPersonnelService: LienPersonnelService,
              private messageService: NzMessageService) {
    this.option = {
      title: {
        text: '谈话统计汇总数:' + this.ciShuTotal,
        right: '10%'
      },
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: { show: true },
        },
      },
      xAxis: [
        {
          type: 'category',
          data: [],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          minInterval: 1,
          min: 0,
          max: 100,
        },
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [],
        },
      ],
    };
    this.optionDuration = {
      title: {
        text: '谈话时长汇总数:' + this.shiChangTotal,
        right: '10%'
      },
      color: ['#db001a'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: { show: true },
          excludeComponents: ['toolbox'],
          pixelRatio: 2
        },
      },
      xAxis: [
        {
          type: 'category',
          data: [],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          minInterval: 1,
          min: 0,
          max: 100,
        },
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [],
        },
      ],
    };
  }

  ngOnInit(): void {
    this.loadMore();
  }

  // 查询留置人
  loadMore(): void {
    const lienPersonnelQuery = new QueryParam<LienPersonnel>();
    let lienPersonnels = new SanyiPage<LienPersonnel>();
    lienPersonnelQuery.paging = false;
    lienPersonnelQuery.query.outStatus = '0';
    this.isLoading = true;
    this.lienPersonnelService.findLienPersonnels(lienPersonnelQuery).subscribe((res) => {
      lienPersonnels = res;
      this.isLoading = false;
      this.optionLP = lienPersonnels.content;
    });
  }

  // 点击查询
  select(): void {
    if (this.lId && this.submitTime && this.submitTime.length > 0) {
      const countList = []; // 初始化次数数组
      const submitTimeList = []; // 初始化时间数组
      const durationList = []; // 初始化时长数组
      this.sDto.lId = this.lId;
      this.sDto.startTime = moment(this.submitTime[0]).format('YYYY-MM-DD');
      this.sDto.endTime = moment(this.submitTime[1]).format('YYYY-MM-DD');
      // 获取结束时间 和 开始时间之间的天数
      const timeDuration = moment.duration(this.submitTime[1] - this.submitTime[0]).asDays() + 1;
      for (let i = 0; i < timeDuration; i++) {
        submitTimeList.push(moment(moment(this.submitTime[0]).add(i, 'days')).format('YYYY-MM-DD'));
        countList.push(0);
        durationList.push(0);
      }

      this.nurseService.statisticTanHua(this.sDto).subscribe((result) => {
        this.ciShuTotal = 0; // 次数汇总
        this.shiChangTotal = 0; // 时长汇总
        // 指定图表的配置项和数据
        this.statisticTanHuaDtos = result;
        console.log(this.statisticTanHuaDtos);
        if (this.statisticTanHuaDtos && this.statisticTanHuaDtos.length > 0 ) {
          for (let j = 0; j < submitTimeList.length; j++) {
            for (let w = 0; w < this.statisticTanHuaDtos.length; w++) {
              if (submitTimeList[j] === this.statisticTanHuaDtos[w].submitTime) {
                console.log('次数', this.statisticTanHuaDtos[w].count);
                console.log('次数类型', typeof this.statisticTanHuaDtos[w].count);
                console.log('时长', this.statisticTanHuaDtos[w].duration);
                console.log('时长类型', typeof this.statisticTanHuaDtos[w].duration);
                countList[j] = this.statisticTanHuaDtos[w].count;
                this.ciShuTotal += parseInt(this.statisticTanHuaDtos[w].count, 10);
                durationList[j] = this.statisticTanHuaDtos[w].duration;
                this.shiChangTotal += parseInt(this.statisticTanHuaDtos[w].duration, 10);
              }
            }
          }
        }
        this.option = {
          title: {
            text: '谈话统计汇总数:' + this.ciShuTotal,
            right: '10%'
          },
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: { show: true },
            },
          },
          xAxis: [
            {
              type: 'category',
              data: submitTimeList,
              interval: 0,
              rotate: 40,
              axisTick: {
                alignWithLabel: true,
              },
            }
          ],
          yAxis: [
            {
              type: 'value',
              minInterval: 1,
              min: 0,
            },
          ],
          series: [
            {
              name: '谈话次数',
              type: 'bar',
              barWidth: '60%',
              data: countList,
            },
          ],
        };
        this.optionDuration = {
            title: {
              text: '谈话时长汇总数:' + this.shiChangTotal,
              right: '10%'
            },
            color: ['#db001a'],
            tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
              },
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true,
            },
            toolbox: {
              feature: {
                saveAsImage: { show: true },
              },
            },
            xAxis: [
              {
                type: 'category',
                data: submitTimeList,
                interval: 0,
                rotate: 40,
                axisTick: {
                  alignWithLabel: true,
                },
              }
            ],
            yAxis: [
              {
                type: 'value',
                minInterval: 1,
                min: 0,
              },
            ],
            series: [
              {
                name: '谈话时长',
                type: 'bar',
                barWidth: '60%',
                data: durationList,
              },
            ],
          };
      });
    } else {
      this.messageService.error('请选择代号，并填写开始时间和结束时间！');
    }
  }

}

