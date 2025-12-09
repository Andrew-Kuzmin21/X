from fastapi import APIRouter, status, Path, Response
from typing import Annotated
from src.dependencies import MapsServiceDep
from .schemas import MapLoad, MapUnload, MapCoreUnload

router = APIRouter(
    tags=['maps']
)


@router.post(
    '/directions/{direction_id}/maps/load',
    status_code=status.HTTP_204_NO_CONTENT,
    responses={
        204: {'description': 'Educational map successfully loaded'},
        404: {'description': 'Direction not found'}
    },
    summary='Load the educational map into the database'
)
def load_map(direction_id: Annotated[int, Path(gt=0)], data: MapLoad, maps_service: MapsServiceDep) -> Response:
    maps_service.load_map(direction_id, data)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get(
    '/directions/{direction_id}/maps/unload',
    responses={
        200: {'description': 'Educational map successfully unloaded'},
        404: {'description': 'Direction not found'}
    },
    summary='Unload the educational map from the database'
)
def unload_map(direction_id: Annotated[int, Path(gt=0)], maps_service: MapsServiceDep) -> MapUnload:
    return maps_service.unload_map(direction_id)


@router.get(
    '/map-cors/{map_core_id}/unload',
    responses={
        200: {'description': 'Map core successfully unloaded'},
        404: {'description': 'Map core not found'}
    },
    summary='Unload the map core from the database'
)
def unload_map_core(map_core_id: Annotated[int, Path(gt=0)], maps_service: MapsServiceDep) -> MapCoreUnload:
    return maps_service.unload_map_core(map_core_id)
