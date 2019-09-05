import { LienPersonnelService } from '../../services/LienPersonnelService';
import { StatisticResultDto } from '../../model/dto/statisticResultDto';
import { HealthService } from '../../services/HealthService';
import { StatisticDto } from '../../model/dto/statisticDto';
import { LienPersonnel } from '../../model/LienPersonnel';
import { QueryParam } from '../../model/page/QueryParam';
import { SanyiPage } from '../../model/page/SanyiPage';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css'],
})
export class StatisticComponent implements OnInit {
  isLoading = false;
  option: {};
  statisticResultDtos: Array<StatisticResultDto> = new Array<StatisticResultDto>();
  sDto: StatisticDto = new StatisticDto();
  optionLP: Array<LienPersonnel> = new Array<LienPersonnel>(); // 遍历留置人代号
  // 留置人id
  lId: any;
  // 体检时间
  tijianshijian: any;
  tijianshijianList = []; // 体检时间数组
  gaoxueyaList = []; // 高血压
  dixueyaList = []; // 低血压
  xinlvList = []; // 心率
  tiwenList = []; // 体温
  constructor(private router: Router, private healthService: HealthService, private lienPersonnelService: LienPersonnelService) {
    this.option = {
      color: ['#ff0100', '#2f4554', '#61a0a8', '#b2331f'],
      title: {
        text: '留置人员身体情况趋势图',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['体温', '心率', '舒张压', '收缩压'],
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
      xAxis: {
        boundaryGap: false,
        data: [],
      },
      yAxis: {
        type: 'value',
      },
      series: [{
        name: '体温',
        type: 'line',
        stack: '总量',
        data: [],
      },
        {
          name: '心率',
          type: 'line',
          stack: '总量',
          data: [],
        },
        {
          name: '舒张压',
          type: 'line',
          stack: '总量',
          data: [],
        },
        {
          name: '收缩压',
          type: 'line',
          stack: '总量',
          data: [],
        }],
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
    this.isLoading = true;
    this.lienPersonnelService.findLienPersonnels(lienPersonnelQuery).subscribe((res) => {
      lienPersonnels = res;
      this.isLoading = false;
      this.optionLP = lienPersonnels.content;
    });
  }
  // 点击查询
  select (): void {
    this.sDto.lId = this.lId;
    this.sDto.startTime = moment(this.tijianshijian[0]).format('YYYY-MM-DD');
    this.sDto.endTime = moment(this.tijianshijian[1]).format('YYYY-MM-DD');
    // 获取结束时间 和 开始时间之间的天数
    const timeDuration = moment.duration(this.tijianshijian[1] - this.tijianshijian[0]).asDays() + 1;
    for (let i = 0; i < timeDuration; i++) {
      this.tijianshijianList.push(moment(moment(this.tijianshijian[0]).add(i, 'days')).format('YYYY-MM-DD'));
      this.gaoxueyaList.push(0);
      this.dixueyaList.push(0);
      this.xinlvList.push(0);
      this.tiwenList.push(0);
    }
    if (this.sDto.lId && this.sDto.startTime && this.sDto.endTime) {
      this.healthService.selectlzXinLv(this.sDto).subscribe( (result) => {
        // 指定图表的配置项和数据
        this.statisticResultDtos = result;
        console.log(this.statisticResultDtos);
        if (this.statisticResultDtos && this.statisticResultDtos.length > 0 ) {
          for (let i = 0; i < this.tijianshijianList.length; i++) {
            for (let w = 0; w < this.statisticResultDtos.length; w++) {
                if (this.tijianshijianList[i] === this.statisticResultDtos[w].tiJianTime) {
                  this.tiwenList[i] = this.statisticResultDtos[w].tiwen;
                  this.xinlvList[i] = this.statisticResultDtos[w].xinLv;
                  this.dixueyaList[i] = this.statisticResultDtos[w].xueYa;
                  this.gaoxueyaList[i] = this.statisticResultDtos[w].gaoXueYa;
                }
            }
          }
        }
        this.option = {
          color: ['#ff0100', '#2f4554', '#61a0a8', '#b2331f'],
          title: {
            text: '留置人员身体情况趋势图',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['体温', '心率', '舒张压', '收缩压'],
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
          xAxis: {
            boundaryGap: false,
            data: this.tijianshijianList,
          },
          yAxis: {
            type: 'value',
          },
          series: [{
            name: '体温',
            type: 'line',
            stack: '总量',
            data: this.tiwenList,
            // [120, 132, 101, 134, 90, 230, 210]
          },
            {
              name: '心率',
              type: 'line',
              stack: '总量',
              data: this.xinlvList,
              // [220, 182, 191, 234, 290, 330, 310],
            },
            {
              name: '舒张压',
              type: 'line',
              stack: '总量',
              data: this.dixueyaList,
              // [150, 232, 201, 154, 190, 330, 410],
            },
            {
              name: '收缩压',
              type: 'line',
              stack: '总量',
              data: this.gaoxueyaList,
              // [320, 332, 301, 334, 390, 330, 320],
            }],
        };
      });
    }
  }

}
