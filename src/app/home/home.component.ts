import { HotToastService } from '@ngneat/hot-toast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgSelectComponent, NgSelectConfig } from '@ng-select/ng-select';

interface Node {
  id: number;
  name: string;
  role: 'Source' | 'Manipulator' | 'Predictor' | 'Board' | 'Circut';
  img: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  selectedNodes: any[] = [];
  // Dummy list of nodes
  nodes: Node[] = [
    { id: 1, name: 'Deal Generator', role: 'Source', img: 'assets/images/data-generator.png' },
    { id: 2, name: 'CASE Switch Data (Start)', role: 'Manipulator', img: 'assets/images/case-switch.png' },
    { id: 3, name: 'Cluster Assigner', role: 'Predictor', img: 'assets/images/cluster-assigner.png' },
    { id: 4, name: 'Logic Board', role: 'Board', img: 'assets/images/data-generator.png' },
    { id: 5, name: 'Operator Circut', role: 'Circut', img: 'assets/images/cluster-assigner.png' },
  ];
  @ViewChild('ngSelectComponent') ngSelectComponent!: NgSelectComponent;
  constructor(private toastService: HotToastService, private config: NgSelectConfig) {
    this.config.notFoundText = 'Custom not found';
    this.config.appendTo = 'body';
    this.config.bindValue = 'value';
  }

  ngOnInit() {}

  drop(event: any) {
    // Updates the order of both items in array
    try {
      this.selectedNodes[event?.previousContainer?.data?.index] = event?.container?.data?.item;
      this.selectedNodes[event?.container?.data?.index] = event?.previousContainer?.data?.item;
    } catch (error) {
      throw new Error('Error occurred while moving item to new position');
    }
  }

  onNodeSelect(event: Node) {
    if (!event) return;
    // Adds selected item to selectedNodes array
    try {
      this.selectedNodes?.push(event);
      this.ngSelectComponent.clearModel();
      this.toastService.success(`${event?.name} has been added.`);
    } catch (error) {
      throw new Error('Error occurred while selecting node');
    }
  }

  removeNode(index: number) {
    // Removes node with given index from selectedNodes array
    try {
      const node = this.selectedNodes[index];
      this.selectedNodes?.splice(index, 1);
      this.toastService.success(`${node?.name} has been removed.`);
    } catch (error) {
      throw new Error('An error occurred while removing node');
    }
  }
}
