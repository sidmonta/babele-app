import React from 'react'
import { useParams } from '@reach/router'
import { useDewey } from '../../context/dewey-select'
import { DeweyCategory } from '@sidmonta/babelelibrary/lib/types'
import WrapBookcase from '../../components/wrapbookcase/WrapBookcase'
import WoodBookcase from '../../components/woodbookcase/WoodBookcase'
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs'

type categoryParams = {
  categoryId: string
}

export default function CategoryPage({ path }: { path: string }) {
  const params: categoryParams = useParams()
  const currentDewey = params.categoryId
  const selectDewey: DeweyCategory | null = useDewey(currentDewey)

  return (
    <div className="page-container">
      <div className="bookcase-container">
        <WrapBookcase deweySelect={selectDewey} />
      </div>
      <div className="breadcrumbs-container">
        <Breadcrumbs dewey={selectDewey} />
      </div>
      <WoodBookcase title={selectDewey?.name || ''}>
        <div className="wood-book">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquam tortor sit amet enim ornare dignissim.
          Pellentesque ac nulla varius, gravida dui hendrerit, tincidunt libero. Cras id commodo risus. Aenean tincidunt
          sit amet sem at fringilla. Donec tristique ligula vel nisl suscipit scelerisque. Pellentesque habitant morbi
          tristique senectus et netus et malesuada fames ac turpis egestas. Duis porta vitae nisi ac gravida. Integer at
          massa mollis, sodales nibh in, sagittis mauris. Proin ullamcorper lacus vel mauris cursus, nec aliquam lectus
          placerat. Vestibulum sollicitudin nunc eget ante accumsan, eu sollicitudin enim consequat. Quisque semper
          viverra massa, non viverra risus rhoncus ut. Proin ac rhoncus erat. In maximus dui ex. Mauris commodo, dolor
          eu interdum euismod, tortor eros porttitor turpis, at fermentum risus lectus vitae elit. Nam tellus magna,
          lacinia sit amet maximus a, eleifend in felis. Mauris interdum tortor porttitor leo efficitur lobortis. Morbi
          et bibendum arcu, sed rhoncus nulla. Etiam porttitor lacinia sollicitudin. Nullam non dapibus tortor. Nunc
          tempor, mi non laoreet sodales, ante lectus posuere tellus, quis ultricies ante mi id nulla. Maecenas sagittis
          hendrerit ex at facilisis. Praesent tristique velit risus. Aenean nec elit consequat nisi vulputate imperdiet.
          Cras iaculis eros at turpis feugiat, in ultricies metus dapibus. In hac habitasse platea dictumst. Suspendisse
          viverra, augue vitae fringilla vestibulum, lorem tellus euismod ex, convallis iaculis lacus nulla nec urna.
          Vestibulum convallis, dui et luctus cursus, sapien felis maximus quam, blandit sagittis arcu dui non lectus.
          Curabitur in dictum sapien. Aenean neque lectus, eleifend in faucibus eget, consequat quis sem. Aenean
          vulputate neque sem, sit amet auctor leo luctus ac. Nulla facilisi. Maecenas eu velit vestibulum, luctus elit
          at, commodo urna. Ut sodales dolor a nunc tincidunt cursus. Vestibulum eros dolor, maximus eu enim et,
          faucibus facilisis purus. Aliquam venenatis, nisi et dictum blandit, erat dui sodales nulla, sed feugiat
          sapien diam et nunc. Aliquam eu mauris ante. Morbi enim odio, faucibus sed tincidunt vel, rutrum sed purus.
          Sed iaculis semper ultricies. Nunc ullamcorper eros at nisi eleifend ornare. In egestas pretium finibus. Ut
          non orci arcu. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla id tellus ligula. Cras et
          quam massa. Sed vitae velit eget augue mollis gravida quis ac est. Vivamus vulputate pharetra felis rutrum
          interdum. Suspendisse in maximus dui, nec vestibulum enim. Nulla sit amet rutrum diam. Sed congue justo sed
          velit semper, ut ultricies magna venenatis. Suspendisse ac convallis quam, at feugiat orci. Donec sit amet
          tellus ac augue molestie scelerisque. Sed blandit sem metus, a faucibus velit molestie id. Sed a fringilla
          sem. Sed tempus, massa nec posuere hendrerit, leo sapien egestas augue, et congue sem risus et magna. Maecenas
          imperdiet diam et arcu volutpat malesuada. Maecenas a faucibus leo. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Mauris aliquam tortor sit amet enim ornare dignissim. Pellentesque ac nulla varius, gravida
          dui hendrerit, tincidunt libero. Cras id commodo risus. Aenean tincidunt sit amet sem at fringilla. Donec
          tristique ligula vel nisl suscipit scelerisque. Pellentesque habitant morbi tristique senectus et netus et
          malesuada fames ac turpis egestas. Duis porta vitae nisi ac gravida. Integer at massa mollis, sodales nibh in,
          sagittis mauris. Proin ullamcorper lacus vel mauris cursus, nec aliquam lectus placerat. Vestibulum
          sollicitudin nunc eget ante accumsan, eu sollicitudin enim consequat. Quisque semper viverra massa, non
          viverra risus rhoncus ut. Proin ac rhoncus erat. In maximus dui ex. Mauris commodo, dolor eu interdum euismod,
          tortor eros porttitor turpis, at fermentum risus lectus vitae elit. Nam tellus magna, lacinia sit amet maximus
          a, eleifend in felis. Mauris interdum tortor porttitor leo efficitur lobortis. Morbi et bibendum arcu, sed
          rhoncus nulla. Etiam porttitor lacinia sollicitudin. Nullam non dapibus tortor. Nunc tempor, mi non laoreet
          sodales, ante lectus posuere tellus, quis ultricies ante mi id nulla. Maecenas sagittis hendrerit ex at
          facilisis. Praesent tristique velit risus. Aenean nec elit consequat nisi vulputate imperdiet. Cras iaculis
          eros at turpis feugiat, in ultricies metus dapibus. In hac habitasse platea dictumst. Suspendisse viverra,
          augue vitae fringilla vestibulum, lorem tellus euismod ex, convallis iaculis lacus nulla nec urna. Vestibulum
          convallis, dui et luctus cursus, sapien felis maximus quam, blandit sagittis arcu dui non lectus. Curabitur in
          dictum sapien. Aenean neque lectus, eleifend in faucibus eget, consequat quis sem. Aenean vulputate neque sem,
          sit amet auctor leo luctus ac. Nulla facilisi. Maecenas eu velit vestibulum, luctus elit at, commodo urna. Ut
          sodales dolor a nunc tincidunt cursus. Vestibulum eros dolor, maximus eu enim et, faucibus facilisis purus.
          Aliquam venenatis, nisi et dictum blandit, erat dui sodales nulla, sed feugiat sapien diam et nunc. Aliquam eu
          mauris ante. Morbi enim odio, faucibus sed tincidunt vel, rutrum sed purus. Sed iaculis semper ultricies. Nunc
          ullamcorper eros at nisi eleifend ornare. In egestas pretium finibus. Ut non orci arcu. Interdum et malesuada
          fames ac ante ipsum primis in faucibus. Nulla id tellus ligula. Cras et quam massa. Sed vitae velit eget augue
          mollis gravida quis ac est. Vivamus vulputate pharetra felis rutrum interdum. Suspendisse in maximus dui, nec
          vestibulum enim. Nulla sit amet rutrum diam. Sed congue justo sed velit semper, ut ultricies magna venenatis.
          Suspendisse ac convallis quam, at feugiat orci. Donec sit amet tellus ac augue molestie scelerisque. Sed
          blandit sem metus, a faucibus velit molestie id. Sed a fringilla sem. Sed tempus, massa nec posuere hendrerit,
          leo sapien egestas augue, et congue sem risus et magna. Maecenas imperdiet diam et arcu volutpat malesuada.
          Maecenas a faucibus leo.
        </div>
      </WoodBookcase>
    </div>
  )
}
