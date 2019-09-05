import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-changguitijian-edit',
  templateUrl: './view.component.html',
})
export class ChangguitijianViewComponent implements OnInit {
  i = 1;
  editCache = {};
  dataSet = [];
  // list = [{
  //   id: '1',
  //   name: '李'
  // }
  // ];
  // isDisabled = true;
  constructor() {
  }



  startEdit(key: string): void {
    this.editCache[ key ].edit = true;
  }

  cancelEdit(key: string): void {
    this.editCache[ key ].edit = false;
  }

  saveEdit(key: string): void {
    const index = this.dataSet.findIndex(item => item.key === key);
    Object.assign(this.dataSet[ index ], this.editCache[ key ].data);
    // this.dataSet[ index ] = this.editCache[ key ].data;
    this.editCache[ key ].edit = false;
  }

  updateEditCache(): void {

    this.dataSet.forEach(item => {
      console.log(this.editCache[ item.key ]);
      if (!this.editCache[ item.key ]) {
        this.editCache[ item.key ] = {
          edit: false,
          data: { ...item }
        };
        console.log(this.editCache);
      }
    });
  }

  ngOnInit(): void {
    for (let i = 0; i < 3; i++) {
      this.dataSet.push({
        key    : i.toString(),
        name   : `Edrward ${i}`,
        age    : 32,
        address: `London Park no. ${i}`
      });
    }
    this.updateEditCache();
    console.log(this.dataSet);
  }
  newOne() {
      this.dataSet.push({
        key    : '3',
        name   : `Edrward 3`,
        age    : 33,
        address: `London Park no. 3`
      });
      // this.editCache[ 3 ] = {
      //   edit: false,
      //   data: { ...this.dataSet[3] }
      // };
      console.log(this.dataSet);
    }
    // this.list.push({ id: '', name: '' });
  // }
  // edit () {
  //   this.isDisabled = false;
  // }

}
