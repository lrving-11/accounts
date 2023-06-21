<template lang="">
  <div class="home">
    <header class="header">
      <div class="title">瑞祥沣洗车行</div>
    </header>
    <div class="main">
      <a-menu
        id="dddddd"
        v-model:selectedKeys="selectedKeys1"
        style="width: 256px"
        mode="inline"
        @click="handleClick"
        class="menu"
      >
        <a-menu-item key="enter">
          <template #icon>
            <mail-outlined />
          </template>
          信息录入
        </a-menu-item>
        <a-menu-item key="app">
          <template #icon>
            <appstore-outlined />
          </template>
          信息查询
        </a-menu-item>
      </a-menu>
      <div class="dashboard">
        <div class="card-title">{{ title }}</div>
        <a-table :columns="columns" :data-source="dataSource" bordered>
          <template #bodyCell="{ column, text, record }">
            <template v-if="['name', 'phone', 'age', 'vip', 'money'].includes(column.dataIndex)">
              <div>
                <a-input
                  v-if="editableData[record.key]"
                  v-model:value="editableData[record.key][column.dataIndex]"
                  style="margin: -5px 0"
                />
                <template v-else>
                  {{ text }}
                </template>
              </div>
            </template>
            <template v-else-if="column.dataIndex === 'operation'">
              <div class="editable-row-operations">
                <span v-if="editableData[record.key]">
                  <a-typography-link @click="save(record.key)" style="margin-right: 20px">保存</a-typography-link>
                  <a-typography-link @click="cancel(record.key)">取消</a-typography-link>
                </span>
                <span v-else>
                  <a @click="edit(record.key)">编辑</a>
                </span>
              </div>
            </template>
          </template>
          <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
            <div style="padding: 8px">
              <a-input
                ref="searchInput"
                :placeholder="`Search ${column.dataIndex}`"
                :value="selectedKeys[0]"
                style="width: 188px; margin-bottom: 8px; display: block"
                @change="(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
              />
              <a-button
                type="primary"
                size="small"
                style="width: 90px; margin-right: 8px"
                @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
              >
                <template #icon><SearchOutlined /></template>
                搜索
              </a-button>
              <a-button size="small" style="width: 90px" @click="handleReset(clearFilters)"> 重置 </a-button>
            </div>
          </template>
          <template #customFilterIcon="{ filtered }">
            <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineComponent, ref, reactive } from "vue";
import { MailOutlined, QqOutlined, AppstoreOutlined, SearchOutlined } from "@ant-design/icons-vue";
import { cloneDeep } from "lodash-es";
// menu
const selectedKeys1 = ref(["enter"]);
const title = ref("");
title.value = "信息录入";

const handleClick = (e) => {
  console.log("click", e);
  if (e.key == "enter") {
    title.value = "信息录入";
  } else {
    title.value = "信息查询";
  }
};
defineComponent({
  components: {
    MailOutlined,
    QqOutlined,
    AppstoreOutlined,
    SearchOutlined,
  },
});
// card
const state = reactive({
  searchText: "",
  searchedColumn: "",
});
const searchInput = ref();
const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    width: "10%",
  },
  {
    title: "电话号码",
    dataIndex: "phone",
    width: "15%",
    customFilterDropdown: true,
    onFilter: (value, record) =>{
      // console.log(value,record.phone);
      return record.phone.toString().toLowerCase().includes(value.toLowerCase())//筛选phone
    },
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
  },

  {
    title: "年龄",
    dataIndex: "age",
    width: "10%",
  },
  {
    title: "是否为会员",
    dataIndex: "vip",
    width: "10%",
  },
  {
    title: "余额",
    dataIndex: "money",
    width: "10%",
  },

  {
    title: "编辑",
    dataIndex: "operation",
  },
  {
    title: "删除",
    dataIndex: "delete",
  },
];
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    phone: `2323${i + 1}32344`,
    age: 32,
    money: 1222,
    vip: `否 ${i}`,

  });
}
// 编辑
const dataSource = ref(data);
const editableData = reactive({});
const edit = (key) => {
  editableData[key] = cloneDeep(dataSource.value.filter((item) => key === item.key)[0]);
};
const save = (key) => {
  Object.assign(dataSource.value.filter((item) => key === item.key)[0], editableData[key]);
  delete editableData[key];
};
const cancel = (key) => {
  delete editableData[key];
};
// 搜素
const handleSearch = (selectedKeys, confirm, dataIndex) => {
  // console.log(dataIndex);
  // console.log(selectedKeys);
  state.searchText = selectedKeys[0];
  state.searchedColumn = dataIndex;
  confirm();

};
const handleReset = (clearFilters) => {
  clearFilters({
    confirm: true,
  });
  state.searchText = "";
};
</script>
<style lang="less">
.home {
  width: 100%;
  height: 100%;
  background-color: #f0f2f5;
}
* {
  margin: 0;
  padding: 0;
}
.header {
  width: 100vw;
  height: 80px;
  background: linear-gradient(180deg, #005ae1 0%, #588bef 100%);
  overflow: hidden;
  display: flex;
  align-items: center;

  .title {
    color: white;
    height: 40px;
    line-height: 40px;
    font-size: 40px;
    font-weight: 600;
    width: 400px;
    text-align: center;
    margin-left: 20px;
  }
}
.main {
  height: calc(100% - 80px);

  display: flex;
  .menu {
    height: 100%;
  }
}

.dashboard {
  // position:absolute;
  width: 85%;
  // height: 400px;
  background-color: #fff;
  margin: 10px auto;
  padding: 20px;

  .card-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
  }
}
</style>
